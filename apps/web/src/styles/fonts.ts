import { Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google';

export const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-sans-mono',
  display: 'swap',
});
