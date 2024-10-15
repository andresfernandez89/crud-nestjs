import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OperatorsModule } from './operators/operators.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [HttpModule, OperatorsModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TAREA_ASINC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const task = await lastValueFrom(req);
        return task.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
