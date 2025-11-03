# AI Data Leak Detector - Chrome Extension

A Chrome extension that uses AI to detect potential data leaks and protect your digital identity while browsing the web.

## Features

- Real-time scanning of websites for potential data leaks
- Risk assessment and security metrics
- Detailed analysis of website security practices
- Notifications for high-risk websites
- Background monitoring for continuous protection

## Installation Instructions

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build:extension` to build the extension
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top right corner
6. Click "Load unpacked" and select the `dist` folder from this project
7. The extension icon should now appear in your Chrome toolbar

## Development

- `npm run dev` - Start development server
- `npm run build:extension` - Build the extension for production
- `npm run lint` - Run linting

## Technologies Used

- React
- TypeScript
- Vite
- Chrome Extension API
- Tailwind CSS
- Shadcn UI Components

## License

MIT
