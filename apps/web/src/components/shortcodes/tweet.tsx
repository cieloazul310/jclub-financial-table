import type { PropsWithChildren } from "react";
import { EmbeddedTweet } from "react-tweet";
import { fetchTweet, type Tweet as TweetData } from "react-tweet/api";
import { cx, css } from "styled-system/css";
import { datestring } from "@/utils/datestring";
import { Blockquote } from "./blockquote";

/**
 * https://github.com/vercel/react-tweet/issues/218
 */

const cache = new Map<string, TweetData | null>();

async function getTweet(
  id: string,
  fetchOptions?: RequestInit,
): Promise<TweetData | undefined> {
  try {
    const { data, tombstone, notFound } = await fetchTweet(id, fetchOptions);

    if (data) {
      console.log(data);
      cache.set(`tweet:${id}`, data);
      return data;
    } else if (tombstone || notFound) {
      // remove the tweet from the cache if it has been made private by the author (tombstone)
      // or if it no longer exists.
      cache.delete(`tweet:${id}`);
    }
  } catch (error) {
    console.error("fetching the tweet failed with:", error);
  }

  const cachedTweet = cache.get(`tweet:${id}`);
  return cachedTweet ?? undefined;
}

export async function Tweet({
  placeholder,
  children,
  id,
}: PropsWithChildren<
  { id: string } & {
    placeholder?: { userId: string; userName: string; date: string };
  }
>) {
  let tweet: TweetData | undefined = undefined;

  try {
    tweet = await getTweet(id);
  } catch (error) {
    console.warn(error);
  }

  if (tweet) {
    if (Array.isArray(tweet.entities)) {
      return (
        <div className={cx("light", css({ my: 8 }))}>
          <EmbeddedTweet tweet={tweet} />
        </div>
      );
    }

    const { user, text, created_at } = tweet;
    const title = `${user.name} @${user.screen_name} ${datestring(new Date(created_at))}`;
    const url = `https://x.com/${user.screen_name}/status/${id}`;

    return (
      <Blockquote title={title} url={url} my={8}>
        <p>{text}</p>
      </Blockquote>
    );
  }

  if (placeholder) {
    const { userId, userName, date } = placeholder;
    const title = `${userName} @${userId} ${datestring(new Date(date))}`;
    const url = `https://x.com/${userId}/status/${id}`;

    return (
      <Blockquote title={title} url={url} my={8}>
        {children}
      </Blockquote>
    );
  }

  return null;
}
