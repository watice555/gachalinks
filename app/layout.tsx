import type { Metadata, Viewport } from "next";
import "./globals.css";

const repository = process.env.GITHUB_REPOSITORY ?? "watice555/gachalinks";
const [repositoryOwner, repositoryName] = repository.split("/");
const siteUrl = repositoryName.endsWith(".github.io")
  ? `https://${repositoryName}/`
  : `https://${repositoryOwner}.github.io/${repositoryName}/`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gacha Links｜抽卡二游资料导航",
  description:
    "面向原神、崩坏：星穹铁道、绝区零、鸣潮与异环玩家的精选资料站、数据工具与创作工具导航。",
  keywords: [
    "二游导航",
    "原神",
    "崩坏星穹铁道",
    "绝区零",
    "鸣潮",
    "异环",
    "抽卡统计",
    "游戏数据库",
  ],
  openGraph: {
    title: "Gacha Links｜抽卡二游资料导航",
    description: "五款游戏的资料站、数据工具与玩家创作工具导航。",
    type: "website",
    locale: "zh_CN",
    siteName: "Gacha Links",
    url: siteUrl,
    images: [
      {
        url: new URL("og-v2.png", siteUrl).toString(),
        width: 1744,
        height: 909,
        alt: "Gacha Links 二游导航站",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gacha Links｜抽卡二游资料导航",
    description: "五款游戏的资料站、数据工具与玩家创作工具导航。",
    images: [new URL("og-v2.png", siteUrl).toString()],
  },
};

export const viewport: Viewport = {
  themeColor: "#070916",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
