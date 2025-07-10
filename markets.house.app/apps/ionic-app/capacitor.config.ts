import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.markets.house',
  appName: 'mhpro',
  webDir: 'dist',
  plugins: {},
  server: {
    androidScheme: 'https',
    hostname: 'localhost'
  }
};

export default config;