import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { NotificationBanner } from "@/components/ui/notification-banner";

export function Alert({
  title,
  children,
  ...rest
}: Omit<NotificationBanner.RootProps, "title" | "type" | "bannerStyle"> & {
  title?: ReactNode;
}) {
  const props = { ...rest };
  return (
    <NotificationBanner.Root type="warning" bannerStyle="color-chip" {...props}>
      <NotificationBanner.Icon />
      {title && (
        <NotificationBanner.Header>
          <NotificationBanner.Heading>{title}</NotificationBanner.Heading>
        </NotificationBanner.Header>
      )}
      {children && (
        <NotificationBanner.Body>{children}</NotificationBanner.Body>
      )}
    </NotificationBanner.Root>
  );
}

export function Info({
  title,
  children,
  ...rest
}: Omit<NotificationBanner.RootProps, "title" | "type" | "bannerStyle"> & {
  title?: ReactNode;
}) {
  const props = { ...rest };
  return (
    <NotificationBanner.Root type="info1" bannerStyle="color-chip" {...props}>
      <NotificationBanner.Icon />
      {title && (
        <NotificationBanner.Header>
          <NotificationBanner.Heading>{title}</NotificationBanner.Heading>
        </NotificationBanner.Header>
      )}
      {children && (
        <NotificationBanner.Body>{children}</NotificationBanner.Body>
      )}
    </NotificationBanner.Root>
  );
}

export function Success({
  title,
  children,
  ...rest
}: Omit<NotificationBanner.RootProps, "title" | "type" | "bannerStyle"> & {
  title?: ReactNode;
}) {
  const props = { ...rest };
  return (
    <NotificationBanner.Root type="success" bannerStyle="color-chip" {...props}>
      <NotificationBanner.Icon />
      {title && (
        <NotificationBanner.Header>
          <NotificationBanner.Heading>{title}</NotificationBanner.Heading>
        </NotificationBanner.Header>
      )}
      {children && (
        <NotificationBanner.Body>{children}</NotificationBanner.Body>
      )}
    </NotificationBanner.Root>
  );
}

export function Error({
  title,
  children,
  ...rest
}: Omit<NotificationBanner.RootProps, "title" | "type" | "bannerStyle"> & {
  title?: ReactNode;
}) {
  const props = { ...rest };
  return (
    <NotificationBanner.Root type="error" bannerStyle="color-chip" {...props}>
      <NotificationBanner.Icon />
      {title && (
        <NotificationBanner.Header>
          <NotificationBanner.Heading>{title}</NotificationBanner.Heading>
        </NotificationBanner.Header>
      )}
      {children && (
        <NotificationBanner.Body>{children}</NotificationBanner.Body>
      )}
    </NotificationBanner.Root>
  );
}

export const notificationBanner = {
  Alert: (props) => <Alert my={8} {...props} />,
  Error: (props) => <Error my={8} {...props} />,
  Info: (props) => <Info my={8} {...props} />,
  Success: (props) => <Success my={8} {...props} />,
} satisfies MDXComponents;
