## 🌍 Easy Track - Field Data Management System

<div align="center">

![Easy Track](https://img.shields.io/badge/Easy_Track-Field_Data_Management-3B82F6?style=for-the-badge&logo=map&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)

**Revolutionizing Field Data Collection in Challenging Environments**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-3B82F6?style=for-the-badge&logo=vercel&logoColor=white)](https://easy-track-final-phase.vercel.app/)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Development Guide](#-development-guide)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

**Easy Track** is an enterprise-grade web application engineered for field operations in African regions and other challenging environments.  
It enables health, environmental, and social impact teams to **collect, manage, and analyze data** from remote locations with limited or intermittent connectivity.

### 🌱 Mission
To empower field operations with technology that works reliably in low-connectivity environments while providing actionable data insights.

### 🌍 Vision
To become the leading field data management platform for humanitarian, environmental, and social impact organizations globally.

---

## 🌐 Live Demo

**Production URL:**  
🔗 [https://easy-track-final-phase.vercel.app/](https://easy-track-final-phase.vercel.app/)

> 💡 *Note: The live demo contains sample data and showcases all major features.*

---

## ✨ Features

### 📊 Advanced Analytics & Dashboard
- 🤖 **AI-Powered Insights**: Real-time analytics and predictive monitoring.
- 📈 **Interactive Visualization** with Recharts.
- 🎯 **KPI Monitoring Dashboard** with real-time updates.
- 🔔 **Activity Feed**: Instant notifications and updates.
- 📱 **Responsive UI** across all devices.

### 📝 Data Collection & Management
- 🔌 **Offline-First Architecture** with auto-sync.
- 📍 **GPS Integration** using Leaflet maps.
- 🧱 **Dynamic Form Builder** with validation.
- 📎 **Media Attachments** (images, video, audio, documents).
- 🔍 **Data Validation** & quality indicators.

### 👥 Team & Operations Management
- 🔐 **Role-Based Access Control** (Admin, Supervisor, Collector).
- 🤝 **Team Collaboration** tools and live messaging.
- 📊 **Performance Analytics** & benchmarking.
- 🗓️ **Scheduling & Task Management** with calendar support.

### 🗺️ Geospatial Intelligence
- 🌍 **Interactive GIS Maps** with overlays.
- 📍 **Smart Geofencing** & alerts.
- 🛣️ **Route Optimization** powered by AI.
- 📌 **Spatial Analytics** for hotspot identification.

### ⚡ Technical Excellence
- 🚀 **High Performance** with lazy loading & code splitting.
- 🎨 **Modern UI/UX** with dark/light mode.
- 🔒 **Enterprise Security** & encryption.
- 📱 **Progressive Web App (PWA)** with offline access.

---

## 🛠️ Technology Stack

### Frontend Core
| Technology | Version | Purpose |
|-------------|----------|----------|
| **Vite** | 5.4.19 | Fast dev server & bundler |
| **React** | 18.3.1 | UI framework |
| **TypeScript** | 5.8.3 | Type safety |
| **Tailwind CSS** | 3.4.17 | Utility-first styling |

### UI Components & Styling
| Library | Usage |
|----------|--------|
| shadcn/ui | Base UI components |
| Lucide React | Icons |
| Tailwind Merge | Safe class merging |
| Tailwind Animate | Animations |
| clsx | Conditional class names |

### Forms & Validation
| Library | Purpose |
|----------|----------|
| React Hook Form | Form management |
| Zod | Schema validation |
| @hookform/resolvers | Integration layer |

### State & Data
| Library | Role |
|----------|------|
| TanStack Query | Data fetching & caching |
| React Router DOM | Routing |

### Visualization & UI Enhancements
| Library | Purpose |
|----------|----------|
| Recharts | Charting |
| Embla Carousel | Carousel |
| React Resizable Panels | Resizable layouts |

### Maps & Geospatial
| Library | Functionality |
|----------|---------------|
| Leaflet | Map rendering |
| React Leaflet | React integration |
| @types/leaflet | TypeScript types |

### Development Tools
| Tool | Purpose |
|------|----------|
| ESLint | Linting |
| Prettier | Formatting |
| TypeScript ESLint | Type rules |

---

## 🚀 Installation

### Prerequisites
- Node.js ≥ 18  
- npm ≥ 9 / yarn ≥ 1.22 / pnpm ≥ 8  
- Git  
- Modern Browser (Chrome, Firefox, Safari latest)

### Quick Setup

```bash
# Clone repository
git clone https://github.com/your-organization/easy-track.git
cd easy-track
```

# Install dependencies
``` npm install --legacy-peer-deps ```

# Start development server
npm run dev
Visit http://localhost:5173

Alternative Package Managers
Yarn

```bash
Copy code
yarn install
yarn dev
PNPM
```

```bash
Copy code
pnpm install
pnpm dev
Environment Configuration
Create .env.local:
```

```bash
Copy code
VITE_APP_TITLE="Easy Track"
VITE_APP_VERSION="1.0.0"
VITE_API_BASE_URL="https://api.yourdomain.com"
VITE_ENABLE_ANALYTICS="true"
VITE_ENABLE_OFFLINE_MODE="true"
VITE_MAPBOX_ACCESS_TOKEN="your_mapbox_token"
VITE_WEATHER_API_KEY="your_weather_api_key"
```

## 📁 Project Structure
``` Copy code
easy-track/
├── public/
│   ├── favicon.ico
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── charts/
│   │   ├── maps/
│   │   └── layout/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── vercel.json
```

## 💻 Development Guide
Common Scripts
Command	Description
```
npm run dev	Start dev server
npm run build	Build for production
npm run preview	Test build locally
npm run lint	Lint source code
```

## 📡 API Documentation
Example Data Models
Field Data

```

Copy code
interface FieldData {
  id: string;
  timestamp: Date;
  location: { latitude: number; longitude: number; accuracy?: number };
  formData: Record<string, any>;
  mediaAttachments?: string[];
  collectedBy: string;
  projectId: string;
  status: 'draft' | 'submitted' | 'verified' | 'rejected';
}
Team Member

ts
Copy code
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'collector';
  assignedProjects: string[];
  lastActive: Date;
  performanceMetrics: {
    submissions: number;
    accuracy: number;
    completionRate: number;
  };
}
```

## 🌐 Deployment
Vercel Deployment (Recommended)
Connect Repository to Vercel

Add Environment Variables in Vercel dashboard

Automatic Deployments on every push to main

Manual Deployment

```bash
Copy code
npm run build
Upload the dist/ folder to your hosting provider.
```

## vercel.json

json
``` Copy code
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🧪 Testing
Run Tests
``` bash
Copy code
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
npm test
npm test -- --coverage
Coverage Goals

Components: 80%

Utilities: 90%

Hooks: 85%

Overall: 80%
```

## 🤝 Contributing
We welcome contributions! 💡

Fork the repo

Create your feature branch

``` bash
Copy code
git checkout -b feature/amazing-feature
Commit using Conventional Commits

Push and open a PR 🚀
```

## 📄 License
Licensed under the MIT License.
See the LICENSE file for details.

## 🆘 Support
Community Support

GitHub Issues – Report bugs

Discussions – Ask questions

Professional Support

Email: support@easytrack.com

Custom development, training, and SLAs available

## 🙌 Acknowledgments
Field Teams — For real-world insights

Open Source Community — For amazing tools

African Tech Ecosystem — For inspiration

<div align= "center">
⭐ Star this project if you find it useful!
💬 Built with ❤️ for efficient, reliable field operations.

## 🔗 Live Demo • 🐛 Report Bug • 💡 Request Feature

</div>