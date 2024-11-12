import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBuyerDTO, UpdateBuyerDTO } from '../dtos/buyer.dto';
import { Buyer } from '../entities/buyer.entity';

@Injectable()
export class BuyersService {
  constructor(@InjectRepository(Buyer) private buyerRepo: Repository<Buyer>) {}

  async findAll(): Promise<Buyer[]> {
    return await this.buyerRepo.find();
  }

  async findById(id: number): Promise<Buyer> {
    const buyer = await this.buyerRepo.findOneBy({ id });
    if (!buyer) {
      throw new NotFoundException(`The buyer with id: #${id} does not exist.`);
    }
    return buyer;
  }

  async create(payload: CreateBuyerDTO) {
    const newBuyer = this.buyerRepo.create(payload);
    return await this.buyerRepo.save(newBuyer);
  }

  async update(id: number, changes: UpdateBuyerDTO) {
    const buyer = await this.findById(id);
    this.buyerRepo.merge(buyer, changes);
    return await this.buyerRepo.save(buyer);
  }

  async delete(id: number) {
    return await this.buyerRepo.delete(id);
  }
}
