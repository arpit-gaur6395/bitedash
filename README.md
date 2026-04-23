# BiteDash

A modern food delivery application built with React, featuring restaurant listings, grocery shopping, and user authentication.

## Features

- 🍕 Restaurant browsing and filtering
- 🛒 Shopping cart functionality
- 🛒 Grocery shopping section
- 🔐 Firebase authentication (Login/Signup)
- 📱 Responsive design with Tailwind CSS
- 🔍 Search functionality
- ⭐ Restaurant ratings and reviews

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **Build Tool**: Parcel
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values from Firebase Console

4. Start the development server:
   ```bash
   npm start
   ```

### Build for Production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a web app to your project
4. Copy the configuration values to your `.env` file

## Project Structure

```
BiteDash/
├── src/
│   ├── components/       # React components
│   ├── context/          # React context (Auth, Cart)
│   ├── firebase/         # Firebase configuration
│   ├── CustomHooks/      # Custom React hooks
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── public/               # Static assets
├── index.html           # Entry HTML
└── package.json         # Project dependencies
```

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run proxy` - Start proxy server for API calls

## License

ISC

## Author

Arpit Gaur
