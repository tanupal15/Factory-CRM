---
name: Precision Industrial
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#1f1f21'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e4e2e4'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#e4e2e4'
  inverse-on-surface: '#303032'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#dec29a'
  on-tertiary: '#3e2d11'
  tertiary-container: '#231500'
  on-tertiary-container: '#957d5a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#131315'
  on-background: '#e4e2e4'
  surface-variant: '#353436'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  metric-xl:
    fontFamily: Poppins
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system is engineered for high-stakes industrial environments where clarity, speed of cognition, and reliability are paramount. It adopts a **Modern Industrial Minimalist** aesthetic, stripping away decorative elements to focus entirely on data hierarchy and machine performance. 

The target audience consists of operations managers and factory floor technicians who require a "heads-up display" experience. The UI evokes a sense of "stable intelligence"—it is professional, rigorous, and technologically advanced without being overwhelming. The style utilizes sharp grids, high-contrast status signaling, and subtle depth to separate layers of information, ensuring the most critical alerts are immediately actionable.

## Colors
This design system utilizes a foundation of deep navies and cool slates to provide a sophisticated, low-fatigue backdrop for prolonged monitoring. 

- **Primary (Navy):** Used for structural navigation, headers, and primary branding elements.
- **Secondary (Electric Blue):** The interactive "action" color. Reserved for CTAs, active selection states, and focus indicators.
- **Status Palette:** Green, Orange, and Red are strictly reserved for functional status (Normal, Warning, Critical). These should never be used for purely decorative purposes.
- **Surface Strategy:** In dark mode, surfaces use a tiered approach from `#0B1120` (base) to `#1E293B` (elevated cards) to ensure depth and readability.

## Typography
The system employs a dual-font strategy. **Poppins** is used for all high-impact data points, metrics, and section headings to provide a modern, geometric structure. For any numerical data within Poppins, `tabular-nums` must be enabled to ensure vertical alignment in dashboards and tables.

**Inter** handles all long-form text, UI labels, and input fields. Its high x-height and neutral character ensure maximum legibility at small sizes. Use `label-xs` in uppercase for table headers and metadata to create clear distinction from content.

## Layout & Spacing
The layout follows a strict 24px grid rhythm. Dashboards should utilize a **Fluid Grid** model with a 12-column structure on desktop, allowing data visualizations to expand or contract based on importance.

- **Gutters:** Fixed at 24px to provide significant visual breathing room between dense data sets.
- **Margins:** 32px global screen padding to frame the industrial dashboard.
- **Breakpoints:** Mobile (up to 768px) switches to a single-column stack with 16px margins. Tablet (769px - 1280px) uses an 8-column grid. Desktop (1281px+) uses the full 12-column grid.

## Elevation & Depth
Depth is created through **Tonal Layering** combined with subtle **Ambient Shadows**. Instead of traditional drop shadows, the design system uses "low-diffuse" shadows that imply a solid object resting slightly above the surface.

- **Base Layer:** Background Light/Dark.
- **Surface Layer:** `rounded-lg` cards with a 1px border. In Light mode, use a border color of `#E2E8F0`; in Dark mode, use `#1E293B`.
- **Shadow Profile:** `0px 4px 12px rgba(0, 0, 0, 0.08)` for cards.
- **Interactive Depth:** When a card is hovered, it should shift slightly upward with an increased shadow spread or a secondary color border glow to indicate interactivity.

## Shapes
The shape language is "Rounded-Industrial." We avoid sharp 90-degree corners to keep the UI feeling modern and software-driven, but we avoid excessive "pill" shapes to maintain a professional, utilitarian tone. 

- **Cards/Containers:** Use `rounded-lg` (0.5rem/8px).
- **Buttons/Inputs:** Use `rounded-md` (0.375rem/6px) for a tighter, more precise look.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid `#3B82F6` with white text.
- **Secondary:** Transparent background with a 1px border of the Primary/Secondary color.
- **States:** 10% brightness increase on hover; 10% decrease on active.

### Cards
- **Structure:** 1px border, 8px corner radius, and 24px internal padding.
- **Hierarchy:** Cards should always contain a title in `label-sm` (uppercase) to define the metric or category.

### Status Indicators
- **Dots:** 8px circles used within tables or lists to indicate live status.
- **Pills:** Used for categorical status (e.g., "Active", "Maintenance"). These use a 10% opacity background of the status color with high-contrast text.

### Form Fields
- **Inputs:** 1px border, 12px padding. In dark mode, fields should be slightly darker than the card surface to create an "inset" feel.

### Data Visualizations
- All charts should use the Primary Navy for base lines and the Secondary Electric Blue for the primary data stream. Status colors (Green/Orange/Red) are only applied when data crosses safety thresholds.