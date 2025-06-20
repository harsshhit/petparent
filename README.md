# ZOOCO Daily Reminders

A Progressive Web App (PWA) for pet parents to manage their daily pet care routines. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 **PWA Support**: Installable on mobile devices and works offline
- 🐾 **Pet Care Reminders**: Create, edit, and delete reminders for your pets
- 📅 **Smart Organization**: Group reminders by time slots (Morning, Afternoon, Evening)
- 🎯 **Categories**: Organize reminders by type (General, Lifestyle, Health)
- 🔥 **Streak Tracking**: Track consecutive days of completed reminders
- 🎨 **Modern UI**: Clean and responsive design with smooth animations
- 💾 **Offline Support**: All data stored in localStorage for offline access
- 📊 **Filtering**: Filter reminders by pet and category
- ✨ **Animations**: Smooth transitions and micro-interactions

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- React Hook Form + Zod (Form Validation)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zooco-reminders.git
   cd zooco-reminders
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Offline Support

The app uses:
- Service Worker for caching static assets
- localStorage for data persistence
- PWA manifest for installability

## Deployment

The app is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
