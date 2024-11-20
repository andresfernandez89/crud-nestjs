import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './controllers/categories.controller';
import { ManufacturersController } from './controllers/manufacturers.controller';
import { ProductsController } from './controllers/products.controller';

import { Manufacturer } from './entities/manufacturer.entity';
import { Product } from './entities/product.entity';

import { CategoriesService } from './services/categories.service';
import { ManufacturersService } from './services/manufacturers.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Manufacturer])],
  controllers: [
    ManufacturersController,
    ProductsController,
    CategoriesController,
  ],
  providers: [ManufacturersService, ProductsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
