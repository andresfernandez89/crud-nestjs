import { Module } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { BuyersController } from './controllers/buyers.controller';
import { OperatorsController } from './controllers/operators.controller';
import { OrdersController } from './controllers/orders.controller';
import { BuyersService } from './services/buyers.service';
import { OperatorsService } from './services/operators.service';
import { OrdersService } from './services/orders.service';

@Module({
  controllers: [BuyersController, OperatorsController, OrdersController],
  providers: [BuyersService, OperatorsService, OrdersService, ProductsService],
})
export class OperatorsModule {}
