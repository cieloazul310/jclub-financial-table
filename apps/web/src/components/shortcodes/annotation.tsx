import { NotificationBanner } from "@/components/ui/notification-banner"; 

export function WorkInProgress() {
  return (
    <NotificationBanner.Root type="warning">
      <NotificationBanner.Icon />
      <NotificationBanner.Header>
        <NotificationBanner.Heading>更新作業中</NotificationBanner.Heading>
      </NotificationBanner.Header>
      <NotificationBanner.Body>
        この記事は現在、更新作業中です。
      </NotificationBanner.Body>
    </NotificationBanner.Root>
  );
}

export function Written({ date, written }: { date: string; written: string }) {
  return (
    <NotificationBanner.Root type="info2">
      <NotificationBanner.Icon />
      <NotificationBanner.Header>
        <NotificationBanner.Heading>後出し記事</NotificationBanner.Heading>
      </NotificationBanner.Header>
      <NotificationBanner.Body>
        この記事は{date}の内容を、{written}に編集したものです。
      </NotificationBanner.Body>
    </NotificationBanner.Root>
  );
}
