import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
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

  findAll(limit: number, offset: number, origin: string): Product[] {
    const filteredProducts = origin
      ? this.products.filter((product) => product.origin === origin)
      : this.products;
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);
    return paginatedProducts;
  }

  findById(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(
        `The product with id: #${id} does not exist.`,
      );
    }

    return product;
  }

  create(payload: CreateProductDTO): Product {
    this.idCount = this.idCount + 1;
    const newProduct = {
      id: this.idCount,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDTO): Product[] {
    const productIndex = this.products.findIndex((item) => item.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(
        `The product with id: #${id} does not exist.`,
      );
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...payload,
    };
    return this.products;
  }

  delete(id: number): boolean {
    const productIndex = this.products.findIndex((item) => item.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(
        `The product with id: #${id} does not exist.`,
      );
    }
    this.products.splice(productIndex, 1);
    return true;
  }
}
