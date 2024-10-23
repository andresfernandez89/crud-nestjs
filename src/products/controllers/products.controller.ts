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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of products to return (default: 100)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Number of products to skip (default: 0)',
  })
  @ApiQuery({
    name: 'origin',
    required: false,
    description: 'Origin filter (default: empty string)',
  })
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
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  @ApiBody({ type: CreateProductDTO })
  createProduct(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing product by its ID' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateProductDTO })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a product by its ID' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
