import { useLocation } from '@reach/router';
import { useSiteMetadata } from './graphql-hooks';

export function useTwitterShare(title?: string) {
  const siteTitle = useSiteMetadata().title;
  const { href } = useLocation();
  const shareTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(href)}`;
}

export function useFacebookShare() {
  const { href } = useLocation();
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(href)}`;
}
