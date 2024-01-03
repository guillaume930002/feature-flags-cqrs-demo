import * as dotenv from 'dotenv';

export class ConfigService {
  constructor() {
    dotenv.config({ path: 'local.env' });
    // console.log(process.env.DB_NAME)
  }
  
  get(key: string): string {
    return process.env[key];
  }
}
