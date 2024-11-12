import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'pg';
import { Repository } from 'typeorm';

import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operators.dto';

import { Product } from 'src/products/entities/product.entity';
import { Buyer } from '../entities/buyer.entity';
import { Operator } from '../entities/operator.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject('APIKEY') private apiKey: string,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operator) private operatorRepo: Repository<Operator>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Buyer) private buyerRepo: Repository<Buyer>,
  ) {}

  async findAll(limit?: number, offset?: number): Promise<Operator[]> {
    return await this.operatorRepo.find({
      skip: offset,
      take: limit,
      relations: ['buyer'],
    });
  }

  async findById(id: number): Promise<Operator> {
    const apikey = this.configService.get('APIKEY');
    const dbname = this.configService.get('DB_NAME');
    console.log(apikey, dbname);
    const operator = await this.operatorRepo.findOne({
      where: { id },
      relations: ['buyer'],
    });
    if (!operator) {
      throw new NotFoundException(
        `The operator with id: #${id} does not exist.`,
      );
    }

    return operator;
  }

  async create(payload: CreateOperatorDTO): Promise<Operator> {
    const newOperator = this.operatorRepo.create(payload);
    if (payload.buyerId) {
      const buyer = await this.buyerRepo.findOneBy({ id: payload.buyerId });
      newOperator.buyer = buyer;
    }
    return this.operatorRepo.save(newOperator);
  }

  async update(id: number, changes: UpdateOperatorDTO) {
    const operator = await this.findById(id);
    if (changes.buyerId) {
      const newBuyer = await this.buyerRepo.findOneBy({ id: changes.buyerId });
      operator.buyer = newBuyer;
    }
    this.operatorRepo.merge(operator, changes);
    return this.operatorRepo.save(operator);
  }

  async delete(id: number) {
    return await this.operatorRepo.delete(id);
  }

  async getOrderByUser(id: number): Promise<Order> {
    const operator = await this.findById(id);
    return {
      date: new Date(),
      operator,
      products: await this.productRepo.find(),
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
