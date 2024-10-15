import { Product } from 'src/products/entities/product.entity';
import { Operator } from './operator.entity';

export class Order {
  date: Date;
  operator: Operator;
  products: Product[];
}
