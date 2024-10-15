import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperatorsModule } from './operators/operators.module';
import { ProductsModule } from './products/products.module';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Module({
  imports: [OperatorsModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
  ],
})
export class AppModule {}
