# TecDrive Design Guidelines

## Design Approach
**Reference-Based Approach**: Google Drive / Dropbox / OneDrive enterprise SaaS aesthetic with focus on clean, professional cloud storage interface.

## Color Palette
- **Primary**: Corporate blue (from logo)
- **Neutrals**: White, black, dark gray for dark mode
- **Accents**: Soft technological tones derived from primary blue
- **System**: Light and dark mode with localStorage toggle

## Typography
- **Hierarchy**: Clear distinction between headings (H1-H6), body text, and UI labels
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Scale**: Mobile-first responsive sizing with comfortable reading for enterprise interface

## Layout System
**Spacing**: Use consistent spacing units - 8px base (equivalent to rem/em units like 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem)

## Page-Specific Layouts

### Landing Page (index.html)
- **Hero Section**: Full-width with logo, compelling headline "TecDrive – Tu nube privada y segura", subtitle, and two CTAs ("Comenzar ahora" → register, "Ver planes" → pricing). Include large hero image showcasing cloud storage concept
- **Project Story Section**: Dedicated section explaining what TecDrive is, why it was created, the intention behind it, and target audience. Use clear paragraphs with headings, possibly timeline or explanation blocks
- **Features Section**: Card grid (3-4 columns desktop, 2 tablet, 1 mobile) with icons showing: security/encryption, total data control, multi-device access, simple Drive-like interface
- **Dashboard Preview**: Mockup or visual representation of the dashboard interface
- **Final CTA**: Registration prompt

### About Page (about.html)
- **Hero**: TecDrive story and mission
- **Mission/Vision/Values**: Professional blocks with icons
- **Team Section**: Grid layout (3 columns desktop, 2 tablet, 1 mobile) with animated cards for:
  - Rodrigo Aldair Tapia Mamani
  - Joel Alexis Puma Murillo
  - Jose Carlos Talavera Pezo
  - Andree Xavi Canaza Viza
  - Uriel Aron Torres Salazar
  
  Each card: name, professional role, brief description, subtle hover animations (lift, shadow)

### Authentication Pages (login.html, register.html)
- **Centered Card Layout**: Max-width 400-450px, centered vertically and horizontally
- **Login Form**: Email, password fields, "Iniciar sesión" button, link to register
- **Register Form**: Full name, email, password, confirm password, "Crear cuenta" button
- **Social Auth Buttons**: Google, Facebook, GitHub with brand colors and icons
- **Validation**: Visual error/success states with color-coded messages

### Pricing Page (pricing.html)
- **Single Plan Card**: Prominently featured "Plan Básico – S/ 35 al mes"
- **Features List**: 5 GB storage, full dashboard access, file upload, folder management, basic support
- **Card Style**: Elevated, highlighted, with "Contratar plan" CTA button
- **Layout**: Centered featured card with explanatory text

### Dashboard (dashboard.html)
**Layout Structure**:
- **Sidebar** (fixed left, 240-280px wide):
  - Minimized TecDrive logo
  - Navigation: Inicio, Mis archivos, Favoritos, Papelera, Configuración
  - Clean, icon + text style
  
- **Top Bar** (fixed, full-width):
  - Logo (small)
  - Search bar (prominent, centered)
  - Theme toggle (light/dark)
  - Notification bell icon
  - User profile avatar/menu
  
- **Main Content Area**:
  - Action buttons row: "Crear carpeta", "Subir archivo"
  - View toggle: Grid/List view switch
  - File/folder display area (grid: 4-5 cols desktop, list: full-width rows)
  - Side panel (slides in when file selected) showing file details
  
- **Free User State**: Show limited view with upgrade prompts for blocked features

### FAQ Page (faq.html)
- **Accordion Layout**: Questions expand/collapse with smooth animation
- **Categories**: Group by topic (TecDrive usage, security, plans, general)

### Contact Page (contact.html)
- **Two-Column Layout** (desktop): Form on left, contact info/map placeholder on right
- **Form Fields**: Name, email, inquiry type dropdown, message textarea
- **Success Notification**: Visual confirmation on submit

## Component Library

### Buttons
- **Primary**: Corporate blue, white text, rounded corners (4-6px)
- **Secondary**: Outlined, blue border
- **Social Auth**: Brand-specific colors (Google blue, Facebook blue, GitHub black)
- **States**: Hover (slight darken/lift), active (pressed), disabled (opacity)

### Cards
- **Style**: White (light mode) / dark gray (dark mode), subtle shadow
- **Hover**: Lift effect (transform translateY), enhanced shadow
- **Padding**: 1.5-2rem internal spacing

### Form Inputs
- **Style**: Clean, bordered, rounded corners
- **Focus State**: Blue border highlight
- **Error State**: Red border, error message below
- **Success State**: Green border, checkmark icon

### File/Folder Items
- **Grid View**: Square cards with icon, filename below, hover overlay
- **List View**: Row with icon, filename, size, date, actions
- **Selection**: Blue highlight border/background

### Modals/Panels
- **Overlay**: Semi-transparent dark background
- **Container**: Centered, white/dark card with close button
- **Side Panel**: Slides from right, 320-360px wide

## Animations
- **Fade-in**: On scroll entry (0.3-0.5s)
- **Slide-up**: Cards and sections entering viewport
- **Parallax**: Subtle effect on hero section
- **Hover**: Card lift (translateY -4px), shadow enhancement
- **Transitions**: Smooth 0.2-0.3s for interactive elements
- **Theme Switch**: Smooth color transition (0.3s)

## Responsive Breakpoints
- **Mobile**: < 640px (single column, stacked)
- **Tablet**: 640px - 1024px (2 columns where applicable)
- **Desktop**: > 1024px (full multi-column layouts)
- **Dashboard**: Collapsible sidebar on mobile/tablet

## Images
- **Hero Image**: Large, full-width background or prominent image showcasing cloud storage concept (servers, cloud visualization, secure data transfer)
- **Dashboard Preview**: Screenshot or mockup of the drive interface on landing page
- **Team Photos**: Placeholder avatars or professional headshots for team members
- **Feature Icons**: Consistent icon set (choose single library like Heroicons or Font Awesome)

## Accessibility
- Proper heading hierarchy (H1 → H6)
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast (WCAG AA minimum)
- Focus indicators on all interactive elements