import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ManufacturersController } from './controllers/manufacturers.controller';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ManufacturersService } from './services/manufacturers.service';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [
    ManufacturersController,
    ProductsController,
    CategoriesController,
  ],
  providers: [ManufacturersService, ProductsService, CategoriesService],
})
export class ProductsModule {}
