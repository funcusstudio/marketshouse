import { registerAs } from '@nestjs/config';

export default registerAs('cottageProjects', () => ({
  apiUrl: 'https://markets.house/wp-json/markets/v1/cottage-villages',
}));