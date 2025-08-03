// src/lib/stockMarketCourse.ts

export interface Lesson {
  slug: string;
  title: string;
  href: string;
}

export interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
}

export const stockMarketCourseStructure: Module[] = [
  {
    title: "stockMarketCourse.module1.title",
    description: "stockMarketCourse.module1.description",
    lessons: [
      { slug: "what-is-a-stock", title: "what-is-a-stock.title", href: "/stock-market-course/what-is-a-stock" },
      { slug: "different-types-of-stocks", title: "different-types-of-stocks.title", href: "/stock-market-course/different-types-of-stocks" },
      { slug: "what-is-a-stock-market", title: "what-is-a-stock-market.title", href: "/stock-market-course/what-is-a-stock-market" },
      { slug: "how-stocks-are-traded", title: "how-stocks-are-traded.title", href: "/stock-market-course/how-stocks-are-traded" },
      { slug: "reading-a-stock-quote", title: "reading-a-stock-quote.title", href: "/stock-market-course/reading-a-stock-quote" },
    ],
  },
  {
    title: "stockMarketCourse.module2.title",
    description: "stockMarketCourse.module2.description",
    lessons: [
        { slug: "bull-vs-bear-markets", title: "bull-vs-bear-markets.title", href: "/stock-market-course/bull-vs-bear-markets" },
        { slug: "market-indices", title: "market-indices.title", href: "/stock-market-course/market-indices" },
        { slug: "role-of-sebi", title: "role-of-sebi.title", href: "/stock-market-course/role-of-sebi" },
    ]
  }
];

// A helper function to get the next and previous lesson for this specific course
export function getStockMarketLessonNavigation(currentSlug: string) {
  const allLessons = stockMarketCourseStructure.flatMap(module => module.lessons);
  const currentIndex = allLessons.findIndex(lesson => lesson.slug === currentSlug);

  if (currentIndex === -1) {
    return { prevLesson: null, nextLesson: null };
  }

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prevLesson, nextLesson };
}
