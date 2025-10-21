# 🚀 Easy Track - Field Data Management System

A comprehensive web application for managing field operations, data collection, and analytics in remote and challenging environments. Designed specifically for health, environmental, and social impact monitoring in African regions.

## ✨ Overview

Easy Track is a modern, full-stack web application built with Next.js that enables field teams to collect, manage, and analyze data from remote locations. The system supports real-time data entry, GPS tracking, offline capabilities, and comprehensive analytics dashboards.

## 🎯 Key Features

### 📊 Dashboard & Analytics
- **Real-time Insights**: AI-powered insights for water quality, health surveys, and climate data
- **Interactive Charts**: Visual data representation with Recharts
- **KPI Monitoring**: Key performance indicators and metrics tracking
- **Activity Feed**: Live updates on field operations and team activities

### 📝 Data Collection
- **Offline-First**: Works without internet connectivity
- **GPS Integration**: Automatic location tracking for data points
- **Form Builder**: Customizable data entry forms with validation
- **Media Upload**: Photo and document attachment capabilities

### 👥 Team Management
- **User Roles**: Administrator, Field Supervisor, Data Collector roles
- **Team Collaboration**: Real-time communication and task assignment
- **Performance Tracking**: Individual and team productivity metrics

### 🗺️ Mapping & GIS
- **Interactive Maps**: Location-based data visualization
- **Geofencing**: Define operational boundaries and zones
- **Route Planning**: Optimized field visit scheduling

### 🔧 Technical Features
- **Real-time Sync**: WebSocket-based data synchronization
- **Progressive Web App**: Installable on mobile devices
- **Dark Mode**: Built-in theme switching
- **Responsive Design**: Works on all device sizes

## 🛠️ Technology Stack

### 🎯 Core Framework
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe JavaScript development
- **🎨 Tailwind CSS 4** - Utility-first CSS framework
- **🟢 Node.js** - Server-side runtime

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components
- **🎯 Lucide React** - Beautiful icon library
- **🌈 Framer Motion** - Smooth animations and transitions
- **🎨 Next Themes** - Dark/light mode support

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant form handling
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data
- **🐻 Zustand** - Lightweight state management
- **🔄 TanStack Query** - Powerful data fetching and caching
- **🌐 Axios** - HTTP client for API requests

### 🗄️ Database & Backend
- **🗄️ Prisma** - Type-safe database ORM
- **🔐 NextAuth.js** - Authentication and authorization
- **📡 Socket.IO** - Real-time communication

### 🎨 Advanced Features
- **📊 TanStack Table** - Advanced data tables
- **🖱️ DND Kit** - Drag and drop functionality
- **📊 Recharts** - Data visualization
- **🖼️ Sharp** - Image processing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard pages
│   ├── data-entry/        # Data collection interface
│   ├── maps/             # Mapping and GIS features
│   ├── settings/         # Application settings
│   └── teams/            # Team management
├── components/            # Reusable React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── data-entry/       # Data entry components
│   ├── layout/           # Layout and navigation
│   └── ui/               # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── db.ts            # Database connection
│   ├── socket.ts        # WebSocket setup
│   └── utils.ts         # Helper functions
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn** package manager
- **SQLite** database (included) or PostgreSQL/MySQL

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd easy-track
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push database schema
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## 📊 API Endpoints

### Core APIs
- `GET /api/health` - Health check endpoint
- `GET /api/insights` - AI-generated insights for dashboard
- `GET/POST /api/data` - Data collection and retrieval

### Authentication
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signout` - User logout

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./db/custom.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# External APIs (optional)
OPENWEATHER_API_KEY="your-weather-api-key"
```

### Database Schema
The application uses Prisma ORM with the following main models:
- **User**: Team members and authentication
- **Project**: Field projects and campaigns
- **DataPoint**: Collected field data
- **Location**: GPS coordinates and boundaries

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📱 Progressive Web App

Easy Track can be installed as a PWA on mobile devices for offline data collection:

1. Open the app in a mobile browser
2. Tap "Add to Home Screen"
3. Launch from the home screen icon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for field operations teams worldwide
- Special thanks to the open-source community
- Designed for impact in underserved communities

---

**Easy Track** - Empowering field operations with technology 🚀
