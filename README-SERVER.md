# 🚀 Denesty World - Joint Server Setup

## 📱 Mobile & PC Compatible Server

Your application is now running on a joint server that works seamlessly on both mobile and PC devices.

## 🖥️ PC Access
- **Local URL**: http://localhost:3000
- Open this URL in your desktop browser

## 📱 Mobile Access
1. **Make sure your mobile and PC are on the same WiFi network**
2. **Use one of these URLs on your mobile device**:
   - http://192.168.1.6:3000 (Wi-Fi)
   - http://192.168.56.1:3000 (Ethernet)

## 🛠️ Server Commands

### Start the server
```bash
npm start
```

### Start with auto-reload (for development)
```bash
npm run dev
```

### Build frontend and start server
```bash
npm run deploy-all
```

### Get your IP addresses
```bash
node get-ip.js
```

## ✅ Features
- ✅ Works on both mobile and PC
- ✅ Handles React Router correctly
- ✅ No more 404 errors on refresh
- ✅ Responsive design
- ✅ CORS enabled for API calls

## 🔧 Troubleshooting

### Mobile not connecting?
1. Check that both devices are on the same WiFi
2. Verify the server is running (`npm start`)
3. Try different IP addresses from `node get-ip.js`
4. Check firewall settings

### Server not starting?
1. Run `npm install` to install dependencies
2. Make sure port 3000 is not in use
3. Check for any error messages

## 🌐 How it works
- Express server serves your React app
- All routes redirect to index.html (fixes React Router)
- Static files served from build folder
- CORS enabled for future API integration

---

**Server Status**: 🟢 Running on port 3000
**Last Updated**: ${new Date().toLocaleString()}
