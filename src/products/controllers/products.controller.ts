import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products.service';

@ApiTags('Products')
@Controller('productos')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAll(
    @Query('limit')
    limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('origin') origin: string = '',
  ) {
    return this.productsService.findAll(limit, offset, origin);
  }

  @ApiOperation({ summary: 'Get a product by its ID' })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  createProduct(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing product by its ID' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDTO,
  ): any {
    return this.productsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a product by its ID' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
