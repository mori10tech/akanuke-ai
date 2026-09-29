"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useState,
  type ReactNode,
} from "react";
import Logo from "./components/Logo";
import { getAllArticles } from "../data/articles";

type IconName =
  | "clock"
  | "yen"
  | "user"
  | "hair"
  | "brow"
  | "skin"
  | "spark"
  | "upload"
  | "brain"
  | "document"
  | "calendar"
  | "bag"
  | "check";

type AnalysisItem = {
  icon: IconName;
  label: string;
  score: number;
  note: string;
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AKANUKE.AI",
  alternateName: "メンズ垢抜けAI診断",
  url: "https://akanuke.ai/",
  description:
    "AIがあなたの魅力を分析し、髪型・眉毛・肌・印象から、あなただけの垢抜けプランを提案する男性向け美容AIサービス。",
  image:
    "https://akanuke.ai/seo/akanuke-ai-search.png",
};

const analysisItems: AnalysisItem[] = [
  {
    icon: "hair",
    label: "HAIR STYLE",
    score: 82,
    note: "清潔感のある爽やかなスタイルが似合います",
  },
  {
    icon: "brow",
    label: "EYEBROW",
    score: 78,
    note: "眉の形を整えると印象がさらにUP",
  },
  {
    icon: "skin",
    label: "SKIN",
    score: 76,
    note: "保湿ケアで肌の透明感を引き出せます",
  },
  {
    icon: "spark",
    label: "OVERALL IMPRESSION",
    score: 86,
    note: "爽やかで誠実な印象をさらに洗練",
  },
];

type AppFeature = {
  number: string;
  label: string;
  title: string;
  catchCopy: string;
  description: string;
  image: string;
  alt: string;
};

const appFeatures: AppFeature[] = [
  {
    number: "01",
    label: "MY AKANUKE",
    title: "マイページ",
    catchCopy: "あなたの垢抜けを、ひとつの場所に。",
    description:
      "診断結果・垢抜けプラン・おすすめ商品など、AKANUKE.AIの各機能へまとめてアクセスできます。",
    image: "/lp/feature-mypage.png",
    alt: "AKANUKE.AIのマイページ画面",
  },
  {
    number: "02",
    label: "AI BEAUTY ANALYSIS",