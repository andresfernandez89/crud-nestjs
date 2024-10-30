import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'pg';
import { ProductsService } from 'src/products/services/products.service';
import { Repository } from 'typeorm';
import { CreateOperatorDTO } from '../dtos/operators.dto';
import { Operator } from '../entities/operator.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OperatorsService {
  constructor(
    private productsService: ProductsService,
    @Inject('APIKEY') private apiKey: string,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operator) private operatorRepo: Repository<Operator>,
  ) {}

  findById(id: number): Promise<Operator> {
    const apikey = this.configService.get('APIKEY');
    const dbname = this.configService.get('DB_NAME');
    console.log(apikey, dbname);
    /* return {
      id: id,
      password: '1234',
      email: 'operadorA@gmail.com',
      role: '',
      }; */
    const operator = this.operatorRepo.findOneBy({ id });
    if (!operator) {
      throw new NotFoundException(
        `The operator with id: #${id} does not exist.`,
      );
    }

    return operator;
  }

  create(payload: CreateOperatorDTO): Promise<Operator> {
    const newOperator = this.operatorRepo.create(payload);
    return this.operatorRepo.save(newOperator);
  }

  async getOrderByUser(id: number): Promise<Order> {
    const operator = await this.findById(id);
    return {
      date: new Date(),
      operator,
      products: await this.productsService.findAll(100, 0, ''),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
