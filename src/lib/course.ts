// src/lib/course.ts
  
  export type Lesson = {
    slug: string;
    title: string;
    href?: string;
    icon?: React.ElementType;
    description?: string;
  };
  
  export type Module = {
    title: string;
    lessons: Lesson[];
  };
  
  export type Course = {
    title: string;
    description: string;
    modules: Module[];
  };
  
  export const courseStructure = [
    {
      level: "foundation",
      title: "Level 1: Foundation - Understanding the Landscape",
      modules: [
        {
          title: "Module 1: India 101 - The Macro Context",
          lessons: [
            { slug: "republic-dna", title: "The Republic's DNA", href: "/awareness/foundation/republic-dna" },
            { slug: "demographic-dividend", title: "The Demographic Dividend (and Dilemma)", href: "/awareness/foundation/demographic-dividend" },
            { slug: "economic-snapshot", title: "Economic Snapshot", href: "/awareness/foundation/economic-snapshot" },
          ],
        },
        {
          title: "Module 2: Pillars of the Economy",
          lessons: [
            { slug: "engine-rooms-of-growth", title: "Engine Rooms of Growth", href: "/awareness/foundation/engine-rooms-of-growth" },
            { slug: "financial-system", title: "The Indian Financial System", href: "/awareness/foundation/financial-system" },
          ],
        },
        {
          title: "Module 3: Who's Who in Indian Business",
          lessons: [
            { slug: "legacy-conglomerates", title: "The Legacy Conglomerates", href: "/awareness/foundation/legacy-conglomerates" },
            { slug: "startup-tsunami", title: "The Startup Tsunami", href: "/awareness/foundation/startup-tsunami" },
          ],
        },
      ],
    },
    {
      level: "professional",
      title: "Level 2: Professional - Navigating the Nuances",
      modules: [
          {
              title: "Module 4: The Regulatory Maze",
              lessons: [
                  { slug: "ease-of-doing-business", title: "Ease of Doing Business: Myth vs. Reality", href: "/awareness/professional/ease-of-doing-business" },
                  { slug: "indian-contracts", title: "Navigating the Labyrinth of Indian Contracts", href: "/awareness/professional/indian-contracts" },
                  { slug: "taxation", title: "Taxation: The Knowns and Unknowns", href: "/awareness/professional/taxation" },
              ],
          },
          {
              title: "Module 5: The Indian Consumer",
              lessons: [
                  { slug: "urban-rural-divide", title: "The Urban-Rural Divide", href: "/awareness/professional/urban-rural-divide" },
                  { slug: "digital-native", title: "The Rise of the Digital Native", href: "/awareness/professional/digital-native" },
                  { slug: "winning-trust", title: "Winning Trust in a Low-Trust Society", href: "/awareness/professional/winning-trust" },
              ],
          },
          {
              title: "Module 6: Go-to-Market Strategy",
              lessons: [
                  { slug: "local-partnerships", title: "Building Local Partnerships", href: "/awareness/professional/local-partnerships" },
                  { slug: "supply-chain", title: "Supply Chain & Logistics: The Final Frontier", href: "/awareness/professional/supply-chain" },
                  { slug: "digital-vs-brick", title: "Digital-First vs. Brick-and-Mortar", href: "/awareness/professional/digital-vs-brick" },
              ],
          },
      ]
    }
  ];

// A helper function to get the next and previous lesson
export function getLessonNavigation(currentSlug: string) {
    const allLessons = courseStructure.flatMap(level => level.modules.flatMap(module => module.lessons));
    const currentIndex = allLessons.findIndex(lesson => lesson.slug === currentSlug);

    if (currentIndex === -1) {
        return { prevLesson: null, nextLesson: null };
    }

    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    return { prevLesson, nextLesson };
}
