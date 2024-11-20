import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

import { Product } from 'src/products/entities/product.entity';
import { Manufacturer } from '../entities/manufacturer.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
  ) {}

  findAll(
    limit?: number,
    offset?: number,
    origin?: string,
  ): Promise<Product[]> {
    const whereCondition = origin ? { origin } : {};
    return this.productRepo.find({
      relations: ['manufacturer'],
      where: whereCondition,
      skip: offset,
      take: limit,
    });
  }

  findById(id: number): Promise<Product> {
    const product = this.productRepo.findOne({
      where: { id },
      relations: ['manufacturer'],
    });
    if (!product) {
      throw new NotFoundException(
        `The product with id: #${id} does not exist.`,
      );
    }

    return product;
  }

  async create(payload: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepo.create(payload);
    if (payload.manufacturerId) {
      const manufacturer = await this.manufacturerRepo.findOneBy({
        id: payload.manufacturerId,
      });
      newProduct.manufacturer = manufacturer;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id });
    if (payload.manufacturerId) {
      const manufacturer = await this.manufacturerRepo.findOneBy({
        id: payload.manufacturerId,
      });
      product.manufacturer = manufacturer;
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
