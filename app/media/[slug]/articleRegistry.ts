import type { ComponentType } from "react";

import type { Article } from "../../../data/articles";

import AkanukenaiManFeaturesArticle from "./articles/akanukenai-man-features";
import MensAkanukeEyebrowsArticle from "./articles/mens-akanuke-eyebrows";
import MensAkanukeGuideArticle from "./articles/mens-akanuke-guide";
import MensAkanukeHairstyleArticle from "./articles/mens-akanuke-hairstyle";
import MensAkanukeOrderArticle from "./articles/mens-akanuke-order";
import MensBeautyBeginnerArticle from "./articles/mens-beauty-beginner";
import MensCleanlinessGuideArticle from "./articles/mens-cleanliness-guide";
import MensSkincareBeginnerArticle from "./articles/mens-skincare-beginner";
import MensBeardGroomingArticle from "./articles/mens-beard-grooming";

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
  "mens-cleanliness-guide": MensCleanlinessGuideArticle,
  "mens-akanuke-order": MensAkanukeOrderArticle,
  "mens-akanuke-eyebrows": MensAkanukeEyebrowsArticle,
  "mens-skincare-beginner": MensSkincareBeginnerArticle,
  "mens-beard-grooming": MensBeardGroomingArticle,
};