import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { Operator } from '../entities/operator.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OperatorsService {
  constructor(private productsService: ProductsService) {}

  findOne(id: number): Operator {
    return {
      id: id,
      password: '1234',
      email: 'operadorA@gmail.com',
      role: '',
    };
  }
  getOrderByUser(id: number): Order {
    const operator = this.findOne(id);
    return {
      date: new Date(),
      operator,
      products: this.productsService.findAll(100, 0, ''),
    };
  }
}
