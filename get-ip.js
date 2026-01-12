const { networkInterfaces } = require('os');

function getLocalIP() {
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push({
          interface: name,
          ip: net.address
        });
      }
    }
  }

  return results;
}

console.log('🌐 Your IP Addresses for Mobile Testing:');
console.log('=' .repeat(50));

const ips = getLocalIP();
if (ips.length > 0) {
  ips.forEach(({ interface: iface, ip }) => {
    console.log(`📱 ${iface}: ${ip}`);
    console.log(`   Mobile URL: http://${ip}:3000`);
    console.log('');
  });
  console.log('✅ Use any of these URLs on your mobile device');
  console.log('💡 Make sure your mobile and PC are on the same WiFi network');
} else {
  console.log('❌ No network interfaces found');
}
