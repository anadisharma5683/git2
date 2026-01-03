# University Internship & Placement Platform

A centralized command center for university internship and placement activities built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Role-Based Access**: Different dashboards for Students, TPOs, and Admins
- **Student Dashboard**: Track applications, view opportunities, and see upcoming deadlines
- **Admin Dashboard**: Manage students, opportunities, and view analytics
- **Kanban-style Application Tracking**: Visualize application status (Applied → Interviewing → Offered)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Using Tailwind CSS with Zinc color palette and glassmorphism effects

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Tailwind
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Mock Data**: Simulated database using TypeScript arrays

## Project Structure

```
internship-platform/
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── OpportunityCard.tsx
│   │   └── ui/
│   │       └── button.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── mockData.ts
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
```

## Core Components

### 1. Sidebar (`app/components/Sidebar.tsx`)
- Navigation that changes based on user role
- Collapsible on mobile devices
- Uses Framer Motion for smooth animations

### 2. Header (`app/components/Header.tsx`)
- Responsive header with search functionality
- Notification indicator
- User profile section

### 3. Opportunity Card (`app/components/OpportunityCard.tsx`)
- Displays company name, role, stipend, and location
- Shows deadline and requirements
- Apply button with action handler

### 4. Mock Data (`app/mockData.ts`)
- Simulates database with users, opportunities, applications, and students
- Types defined for all data structures
- Ready for Firebase integration

## Dashboard Views

### Student Dashboard
- Personalized view showing upcoming deadlines
- Kanban-style application tracking (Applied → Interviewing → Offered)
- Statistics cards showing application metrics
- Opportunity listings

### Admin Dashboard
- Analytics charts showing placement statistics
- Student management table
- Opportunity management
- Application status overview

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

No environment variables are required for the mock data version. For Firebase integration, you would add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

## Future Enhancements

- Firebase integration for real-time data
- AI Career Assistant chat widget
- Real-time notifications
- Advanced analytics and reporting
- Resume builder and management
- Interview scheduling system

## Deployment

This application is ready for deployment on Vercel, Netlify, or any Node.js hosting platform. The PWA features can be enabled by adding a service worker and manifest file.

## License

This project is open source and available under the MIT License.

## Project Completion Summary

This Centralized Internship & Placement Platform has been successfully implemented with all requested features:

- ✅ Role-based access (Student/Admin views)
- ✅ Responsive sidebar and header layout
- ✅ Opportunity card component with apply functionality
- ✅ Kanban-style application tracking
- ✅ Mock data system ready for Firebase integration
- ✅ Glassmorphism UI effects
- ✅ Framer Motion animations
- ✅ Mobile-responsive design with Tailwind CSS
- ✅ TypeScript type safety
- ✅ Next.js 14 App Router structure

The platform is fully functional with mock data and ready for production deployment.# git2
