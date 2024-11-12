import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [
    path.resolve(__dirname, '..') + '/**/entities/*.ts',
    path.resolve(__dirname, '..') + '/**/entities/*.js',
  ],
  migrations: [
    path.resolve(__dirname, '..') + '/**/migrations/*.ts',
    path.resolve(__dirname, '..') + '/**/migrations/*.js',
  ],
  migrationsTableName: 'migrations',
});
