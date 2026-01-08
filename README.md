# OTP Generation and Authentication System

A modern, secure authentication system with OTP verification built with React and TypeScript.

## Features

- 🔐 User Registration with unique ID generation
- 📧 Email/Mobile verification
- 🔑 Secure OTP generation and verification
- 🎨 Modern UI with Material-UI
- 📱 Responsive design
- ⚡ TypeScript support
- 🛡️ Route protection with AuthGuard

## Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI v5
- **State Management**: React Context API
- **Routing**: React Router v6
- **Styling**: Material-UI with custom theme
- **Form Handling**: Formik with Yup validation
- **Notifications**: notistack
- **Fonts**: Roboto & Inter

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd OTP-Generation-and-Authantication-Chatgpt
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/       # Reusable components
│   │   └── AuthGuard.tsx
│   ├── pages/           # Page components
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── OTPVerification.tsx
│   │   └── Dashboard/
│   ├── theme/           # Material-UI theme
│   │   └── theme.ts
│   ├── types/           # TypeScript type definitions
│   │   ├── emotion.d.ts
│   │   └── modules.d.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Authentication Flow

1. **Registration**: User signs up with email/mobile and password
2. **Login**: User enters credentials and receives OTP
3. **OTP Verification**: User enters the 6-digit OTP sent to their registered email
4. **Dashboard**: User is redirected to the protected dashboard after successful verification

## Theme Configuration

The application uses a custom Material-UI theme with:
- Primary Color: #335CFF (Royal Blue)
- Secondary Color: #00A8A8 (Teal)
- Background Color: #F4F6F8 (Soft Grey)
- Typography: Inter and Roboto fonts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Backend API integration
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] User profile management
- [ ] Session management
- [ ] Rate limiting
- [ ] Audit logging
- [ ] Admin panel
