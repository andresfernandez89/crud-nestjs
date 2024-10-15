import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperatorsModule } from './operators/operators.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [OperatorsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
