# Clarity Finance - Style Guide

This style guide provides a comprehensive overview of the visual design system for the getclarity.finance website. It includes details on the color palette and typography to ensure a consistent and professional user experience.

## Color Palette

The color palette is designed to be modern, clean, and accessible. It is divided into primary, secondary, and grayscale colors.

### Primary Colors

The primary color is a deep, professional green, used for backgrounds, and a vibrant lime for calls-to-action.

| Swatch | Name | Hex | Usage |
| --- | --- | --- | --- |
| <div style="background-color:#163300;width:50px;height:20px;border-radius:4px;"></div> | Primary Dark Green | `#163300` | Main background color for headers and hero sections. |
| <div style="background-color:#9FE870;width:50px;height:20px;border-radius:4px;"></div> | Primary Lime | `#9FE870` | Main call-to-action buttons, highlights. |

### Secondary Colors

Secondary colors are used for accents, icons, and links.

| Swatch | Name | Hex | Usage |
| --- | --- | --- | --- |
| <div style="background-color:#3B82F6;width:50px;height:20px;border-radius:4px;"></div> | Blue | `#3B82F6` | Icons, links. |
| <div style="background-color:#22C55E;width:50px;height:20px;border-radius:4px;"></div> | Green | `#22C55E` | Icons. |
| <div style="background-color:#6366F1;width:50px;height:20px;border-radius:4px;"></div> | Indigo | `#6366F1` | Icons. |

### Grayscale

The grayscale palette is used for text, backgrounds, and other neutral UI elements.

| Swatch | Name | Hex | Usage |
| --- | --- | --- | --- |
| <div style="background-color:#111827;width:50px;height:20px;border-radius:4px;"></div> | Gray 900 | `#111827` | Headings, primary text. |
| <div style="background-color:#374151;width:50px;height:20px;border-radius:4px;"></div> | Gray 800 | `#374151` | Body text. |
| <div style="background-color:#6B7280;width:50px;height:20px;border-radius:4px;"></div> | Gray 600 | `#6B7280` | Subheadings, secondary text. |
| <div style="background-color:#F9FAFB;width:50px;height:20px;border-radius:4px;"></div> | Gray 50 | `#F9FAFB` | Light backgrounds, sections. |
| <div style="background-color:#FFFFFF;width:50px;height:20px;border:1px solid #ccc;border-radius:4px;"></div> | White | `#FFFFFF` | Text on dark backgrounds, cards. |
| <div style="background-color:rgba(255,255,255,0.1);width:50px;height:20px;border:1px solid #ccc;border-radius:4px;"></div> | White 10% | `rgba(255,255,255,0.1)` | Borders, active navigation link backgrounds. |
| <div style="background-color:rgba(255,255,255,0.2);width:50px;height:20px;border:1px solid #ccc;border-radius:4px;"></div> | White 20% | `rgba(255,255,255,0.2)` | Secondary call-to-action buttons. |
| <div style="background-color:rgba(255,255,255,0.8);width:50px;height:20px;border:1px solid #ccc;border-radius:4px;"></div> | White 80% | `rgba(255,255,255,0.8)` | Secondary text on dark backgrounds. |

## Typography

The typography is designed to be clean, legible, and modern. The primary font family is **Inter Tight**, with fallback to system sans-serif fonts.

### Font Family
- **Primary:** `Inter Tight`
- **Fallback:** `Arial`, `Helvetica`, `sans-serif`

### Headings

| Style | Font Size | Font Weight | Tailwind Class |
| --- | --- | --- | --- |
| H1 | 3.75rem (60px) | Bold (700) | `text-6xl font-bold` |
| H2 | 2.25rem (36px) | Bold (700) | `text-4xl font-bold` |
| H3 | 1.875rem (30px)| Bold (700) | `text-3xl font-bold` |
| H4 | 1.5rem (24px) | Semibold (600) | `text-2xl font-semibold` |
| Title | 1.875rem (30px)| Semibold (600) | `text-3xl font-semibold` |


### Body Text

| Style | Font Size | Font Weight | Tailwind Class |
| --- | --- | --- | --- |
| Large | 1.125rem (18px) | Regular (400) | `text-lg` |
| Base | 1rem (16px) | Regular (400) | `text-base` |
| Small | 0.875rem (14px) | Medium (500) | `text-sm font-medium` |

## Usage in Code

To use these styles in your project, you can reference the Tailwind CSS classes that correspond to these design tokens. For example, to style a heading, you could use `text-6xl font-bold`. For colors, you can use classes like `bg-lime-400` for backgrounds or `text-gray-900` for text. For the specific hex codes not in the default tailwind palette, you can use arbitrary values like `bg-[#163300]`.

By following this guide, you can ensure a consistent and professional design across the entire getclarity.finance website.
