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

  private idCount = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product A',
      description: 'Description Product A',
      price: 5000,
      stock: 1,
      origin: 'China',
      image: '',
    },
    {
      id: 2,
      name: 'Product B',
      description: 'Description Product B',
      price: 7000,
      stock: 1,
      origin: 'Japon',
      image: '',
    },
  ];

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
    //const filteredProducts = origin
    //  ? this.products.filter((product) => product.origin === origin)
    //  : this.products;
    //const paginatedProducts = filteredProducts.slice(offset, offset + limit);
    //return paginatedProducts;
  }

  findById(id: number): Promise<Product> {
    //const product = this.products.find((item) => item.id === id);
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `The product with id: #${id} does not exist.`,
      );
    }

    return product;
  }

  create(payload: CreateProductDTO): Promise<Product> {
    //this.idCount = this.idCount + 1;
    //const newProduct = {
    //  id: this.idCount,
    //  ...payload,
    //};
    //this.products.push(newProduct);
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDTO) {
    //const productIndex = this.products.findIndex((item) => item.id === id);
    //if (productIndex === -1) {
    //  throw new NotFoundException(
    //    `The product with id: #${id} does not exist.`,
    //  );
    //}
    //this.products[productIndex] = {
    //  ...this.products[productIndex],
    //  ...payload,
    //};
    //return this.products;
    const product = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    //const productIndex = this.products.findIndex((item) => item.id === id);
    //if (productIndex === -1) {
    //  throw new NotFoundException(
    //    `The product with id: #${id} does not exist.`,
    //  );
    //}
    //this.products.splice(productIndex, 1);
    //return true;
    return this.productRepo.delete(id);
  }
}
