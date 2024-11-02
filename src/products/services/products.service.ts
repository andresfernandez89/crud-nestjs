import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll(
    limit?: number,
    offset?: number,
    origin?: string,
  ): Promise<Product[]> {
    const whereCondition = origin ? { origin } : {};
    return this.productRepo.find({
      where: whereCondition,
      skip: offset,
      take: limit,
    });
  }

  findById(id: number): Promise<Product> {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `The product with id: #${id} does not exist.`,
      );
    }

    return product;
  }

  create(payload: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
