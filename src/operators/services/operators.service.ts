import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from 'src/products/services/products.service';
import { Operator } from '../entities/operator.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OperatorsService {
  constructor(
    private productsService: ProductsService,
    @Inject('APIKEY') private apiKey: string,
    private configService: ConfigService,
  ) {}

  findOne(id: number): Operator {
    const apikey = this.configService.get('APIKEY');
    const dbname = this.configService.get('DB_NAME');
    console.log(apikey, dbname);
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
