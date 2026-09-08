import type { ComponentType } from "react";

import type { Article } from "../../../data/articles";

import AkanukenaiManFeaturesArticle from "./articles/AkanukenaiManFeaturesArticle";
import MensAkanukeEyebrowsArticle from "./articles/MensAkanukeEyebrowsArticle";
import MensAkanukeGuideArticle from "./articles/MensAkanukeGuideArticle";
import MensAkanukeHairstyleArticle from "./articles/MensAkanukeHairstyleArticle";
import MensAkanukeOrderArticle from "./articles/MensAkanukeOrderArticle";
import MensBeautyBeginnerArticle from "./articles/MensBeautyBeginnerArticle";

type ArticleContentComponent = ComponentType<{
  article: Article;
}>;

export const articleRegistry: Record<
  string,
  ArticleContentComponent
> = {
  "mens-akanuke-guide": MensAkanukeGuideArticle,
  "akanukenai-man-features": AkanukenaiManFeaturesArticle,
  "mens-akanuke-hairstyle": MensAkanukeHairstyleArticle,
  "mens-beauty-beginner": MensBeautyBeginnerArticle,
  "mens-akanuke-order": MensAkanukeOrderArticle,
  "mens-akanuke-eyebrows": MensAkanukeEyebrowsArticle,
};