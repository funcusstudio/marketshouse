import { registerAs } from '@nestjs/config';

export default registerAs('houseProjects', () => ({
  apiUrl: 'https://markets.house/wp-json/wc/v3/products',
  category: process.env.HOUSE_PROJECTS_CATEGORY || '1182',
  consumerKey: process.env.HOUSE_PROJECTS_CONSUMER_KEY || 'ck_1999b07ba89917b741d97105fa37bd4d31a95e8e',
  consumerSecret: process.env.HOUSE_PROJECTS_CONSUMER_SECRET || 'cs_ffa56843d7f3edd58fca89353d0ce14aeed3aeb8',
  syncInterval: process.env.HOUSE_PROJECTS_SYNC_INTERVAL || '3600000', // 1 час в миллисекундах

})); 