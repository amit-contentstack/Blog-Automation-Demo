# EcoWare Components Library

A comprehensive component library for the EcoWare Solutions website, built with React, TypeScript, and Tailwind CSS.

## Structure

```
src/components/
├── ui/                 # Basic UI components
├── layout/            # Layout and structural components
├── common/            # Business-specific components
├── icons/             # Icon components (future)
├── types.ts           # Shared TypeScript interfaces
├── index.ts           # Main export file
└── README.md          # This file
```

## Design System

All components follow the EcoWare design system with these key tokens:

### Colors
- **Primary**: #002619 (Dark Green) - Use `ecoware-primary`
- **Primary Accent**: #A8FF60 (Lighter Green) - Use `ecoware-primary-accent`  
- **Secondary**: #002619 (Dark Green) - Use `ecoware-secondary`
- **Gray Light**: #F5F5F5 - Use `ecoware-gray-light`
- **Gray Medium**: #E0E0E0 - Use `ecoware-gray-medium`
- **Gray Dark**: #555555 - Use `ecoware-gray-dark`
- **Text Dark**: #111111 - Use `ecoware-text-dark`
- **Text Light**: #FFFFFF - Use `ecoware-text-light`

### Typography
- **Font Family**: 'Poppins', 'Inter', 'Montserrat', sans-serif
- **Spacing**: 80px between major sections
- **Border Radius**: 8px (buttons), 12px (cards)

## Usage

### Basic Import
```tsx
import { Button, Card, Badge } from '@/components';
```

### Category-specific Import
```tsx
import { Button, Input } from '@/components/ui';
import { Header, Footer } from '@/components/layout';
import { Hero, ProductCard } from '@/components/common';
```

## UI Components

### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Get Quote
</Button>
```
- **Variants**: primary, outline
- **Sizes**: sm, md, lg
- **Features**: Hover effects, focus states, disabled support

### Card
```tsx
<Card hover={true} padding={true}>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```
- **Features**: Shadow effects, hover animations, flexible padding

### Badge
```tsx
<Badge variant="primary" size="md">
  Sustainable
</Badge>
```
- **Variants**: primary, secondary, outline
- **Sizes**: sm, md
- **Use Cases**: Categories, tags, status indicators

### Input & Textarea
```tsx
<Input 
  label="Email Address"
  type="email"
  placeholder="john@company.com"
  error={errors.email}
/>

<Textarea
  label="Message"
  rows={5}
  placeholder="Your message..."
/>
```
- **Features**: Validation states, helper text, error handling

## Layout Components

### Container
```tsx
<Container maxWidth="xl" padding={true}>
  <h1>Page Content</h1>
</Container>
```
- **Max Widths**: sm (640px), md (768px), lg (1024px), xl (1140px), full
- **Features**: Responsive padding, centered layout

### Header
```tsx
<Header />
```
- **Features**: Responsive navigation, mobile menu, CTA button
- **Sticky**: Automatically sticks to top of viewport

### Footer
```tsx
<Footer />
```
- **Features**: Company info, navigation links, social media
- **Content**: Contact information, legal links

### Section
```tsx
<Section background="white" padding="lg" container={true}>
  <h2>Section Title</h2>
  <p>Section content...</p>
</Section>
```
- **Backgrounds**: white, gray, dark, primary
- **Padding**: sm (48px), md (64px), lg (80px), xl (96px)

## Common Components

### Hero
```tsx
<Hero
  title="Sustainable Packaging Solutions"
  subtitle="Eco-Friendly"
  description="Reduce environmental impact with our innovative packaging"
  primaryCta={{ text: "Get Started", href: "/contact" }}
  secondaryCta={{ text: "Learn More", href: "/about" }}
/>
```
- **Features**: Background images, overlay support, flexible CTAs
- **Layouts**: Left, center, right text alignment

### ProductCard
```tsx
<ProductCard
  id="eco-box-001"
  name="Biodegradable Storage Box"
  description="100% compostable storage solution"
  image="/images/products/eco-box.jpg"
  category="Storage"
  sustainability={{ recycled: 85, biodegradable: true }}
  specifications={{ material: "Recycled Cardboard" }}
  pricing={{ price: "$12.99", unit: "piece", minOrder: 50 }}
/>
```
- **Features**: Sustainability metrics, hover effects, CTA buttons
- **Use Cases**: Product listings, featured products

### BlogCard
```tsx
<BlogCard
  slug="sustainable-packaging-trends-2024"
  title="Top Packaging Trends for 2024"
  excerpt="Discover the latest sustainable packaging innovations"
  image="/images/blog/trends-2024.jpg"
  category="Industry Insights"
  tags={["Sustainability", "Innovation", "Trends"]}
  publishedAt="2024-01-15"
  author={{ name: "Jane Smith", avatar: "/avatars/jane.jpg" }}
  readTime={5}
/>
```
- **Features**: Author info, read time, tag display, date formatting
- **Use Cases**: Blog listings, featured articles

### ContactForm
```tsx
<ContactForm
  title="Get in Touch"
  preselectedProduct="Eco-Friendly Boxes"
  onSubmit={handleFormSubmit}
/>
```
- **Features**: Validation, product selection, contact preferences
- **Fields**: Personal info, company details, product interests

### SocialLinks
```tsx
<SocialLinks
  size="md"
  variant="outlined"
  orientation="horizontal"
/>
```
- **Variants**: default, outlined, filled
- **Sizes**: sm, md, lg
- **Platforms**: LinkedIn, Facebook, Instagram, Twitter

## Best Practices

### Component Usage
1. **Import Efficiency**: Use the main index for multiple components
2. **Props Spreading**: Avoid spreading props unnecessarily
3. **Type Safety**: Use provided TypeScript interfaces
4. **Accessibility**: Components include ARIA labels and semantic HTML

### Styling
1. **Design Tokens**: Use the predefined color and spacing values
2. **Responsive**: All components are mobile-first responsive
3. **Consistency**: Maintain 80px section spacing
4. **Hover States**: Interactive elements have hover effects

### Performance
1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Components are tree-shakeable
3. **Client Components**: Only when necessary (forms, interactive elements)

## Development

### Adding New Components
1. Create component in appropriate directory (`ui/`, `layout/`, `common/`)
2. Follow existing TypeScript patterns
3. Include proper props interfaces
4. Add to relevant index.ts file
5. Update this README with usage examples

### Testing
```bash
# Run development server
npm run dev

# Build for production
npm run build
```

### Linting
```bash
# Check code quality
npm run lint
```

## Future Enhancements

### Planned Components
- **Loading States**: Skeleton loaders, spinners
- **Modal/Dialog**: Overlay components
- **Dropdown/Select**: Form components
- **Pagination**: Navigation components
- **Breadcrumbs**: Navigation aids
- **Toast Notifications**: Feedback components

### Icon System
- SVG icon components in `components/icons/`
- Icon library with sustainability themes
- Consistent sizing and coloring

### Animation Library
- Framer Motion integration
- Page transitions
- Component animations
- Scroll-triggered animations

---

For questions or contributions, please refer to the main project documentation.
