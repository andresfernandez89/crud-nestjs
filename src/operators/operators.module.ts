import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';

import { BuyersController } from './controllers/buyers.controller';
import { OperatorsController } from './controllers/operators.controller';
import { OrdersController } from './controllers/orders.controller';

import { Product } from 'src/products/entities/product.entity';
import { Buyer } from './entities/buyer.entity';
import { Operator } from './entities/operator.entity';

import { ProductsService } from 'src/products/services/products.service';
import { BuyersService } from './services/buyers.service';
import { OperatorsService } from './services/operators.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Product, Operator, Buyer]),
  ],
  controllers: [BuyersController, OperatorsController, OrdersController],
  providers: [BuyersService, OperatorsService, OrdersService, ProductsService],
})
export class OperatorsModule {}
