import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Open_Sans, Roboto_Mono, Anek_Latin } from "next/font/google";
import localFont from "next/font/local";

//+
const HMFont = localFont({
  src: "fonts/HarmonyOS_Sans_SC_Medium.ttf",
  display: "swap",
  variable: "--font-hm",
});
//e

const dingTalkFont = localFont({
  src: "fonts/DingTalk JinBuTi.ttf",
  display: "swap",
  variable: "--font-dingtalk",
});

const kingsoftFont = localFont({
  src: "fonts/Kingsoft_Cloud_Font.ttf",
  display: "swap",
  variable: "--font-kingsoft",
});

const xinYiGuanHeiFont = localFont({
  src: "fonts/ZiTiQuanXinYiGuanHeiTi.ttf",
  display: "swap",
  variable: "--font-xinyiguanhei",
});

const alibabaFont = localFont({
  src: "fonts/AlibabaPuHuiTi-3-55-Regular.ttf",
  display: "swap",
  variable: "--font-alibaba",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const ankeLatin = Anek_Latin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anke",
});

export const metadata: Metadata = {
  title: "MSQY Cover - Better Cover Image Generator Tools",
  description: "MSQY Cover is a better cover image generator tool for Medium, YouTube, BiliBili, Blog and more. Edit from LiuShen-Fork/picprose",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${openSans.variable} ${robotoMono.variable} ${ankeLatin.variable} ${dingTalkFont.variable} ${kingsoftFont.variable} ${xinYiGuanHeiFont.variable} ${alibabaFont.variable} ${HMFont.variable} font-sans light`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
