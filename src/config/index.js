import dotenv from 'dotenv';
import SERVER from './server';

if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV);
  dotenv.config();
}
const env = process.env.NODE_ENV;
console.log(SERVER[env]);
const Config = {
  server: SERVER[env],
};

export default Config;
