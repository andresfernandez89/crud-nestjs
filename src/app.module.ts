import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasController } from './controllers/categorias.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { FabricantesController } from './controllers/fabricantes.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasService } from './services/categorias.service';
import { CompradoresService } from './services/compradores.service';
import { FabricantesService } from './services/fabricantes.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FabricantesController,
    PedidosController,
    ProductosController,
    OperadoresController,
    CompradoresController,
    CategoriasController,
  ],
  providers: [
    AppService,
    ProductsService,
    CategoriasService,
    CompradoresService,
    FabricantesService,
    OperadoresService,
    PedidosService,
  ],
})
export class AppModule {}
