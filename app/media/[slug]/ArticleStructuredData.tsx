import type { Article } from "../../../data/articles";

type ArticleStructuredDataProps = {
  article: Article;
};

const BASE_URL = "https://akanukeai.com";

export default function ArticleStructuredData({
  article,
}: ArticleStructuredDataProps) {
  const articleUrl = `${BASE_URL}/media/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${BASE_URL}${article.image}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: "AKANUKE.AI",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "AKANUKE.AI",
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AKANUKE.AI",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AKANUKE JOURNAL",
        item: `${BASE_URL}/media`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}