import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get()
  getAllProducts(): string {
    return `Retorna todos los productos`;
  }

  @Get(':id')
  getProductById(@Param('id') id: string): string {
    return `Producto con ID ${id}`;
  }

  @Get('filtrar/genero')
  getByGender(
    @Query('name') name: string,
    @Query('category') category = 'sin especificar',
  ): string {
    return `El producto ${name} pertenece a la categoria ${category}`;
  }

  @Post()
  createProduct(@Body() payload: any) {
    return `El producto creado es un ${payload.name}`;
  }

  @Put(':idProduct')
  updateProduct(@Param('idProduct') idProduct: string, @Body() body: any): any {
    return {
      idProduct: idProduct,
      name: body.name,
      category: body.category,
    };
  }

  @Delete(':idProduct')
  deleteProduct(@Param('idProduct') idProduct: string): any {
    return {
      idProduct: idProduct,
      delete: true,
    };
  }
}
