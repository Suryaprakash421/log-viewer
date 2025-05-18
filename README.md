# Log Viewer

A React application for parsing, viewing, and filtering log files. Built with React and Vite, optimized for deployment on Vercel.

## Features

- Upload and parse log files
- Filter logs by level, tag, and message content
- Infinite scrolling for large log files
- Responsive design with Tailwind CSS
- Persistent storage of logs and filters using localStorage
- PWA capabilities for offline access

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd log-viewer

# Install dependencies
npm install
# or
yarn
```

### Running locally

```bash
# Start development server
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

### Building for production

```bash
# Build the application
npm run build
# or
yarn build
```

## Deployment on Vercel

This project is optimized for deployment on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub repository
2. Sign up for a Vercel account at https://vercel.com
3. Create a new project and import your GitHub repository
4. Vercel will automatically detect the Vite configuration
5. Click "Deploy" and your application will be live in minutes

Alternatively, you can deploy directly from the command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

## Environment Variables

The project uses environment variables for configuration:

- `.env.development` - Used during development
- `.env.production` - Used in production builds

## License

MIT
