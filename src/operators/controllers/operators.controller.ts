import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OperatorsService } from '../services/operators.service';

@Controller('operadores')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getOrderByUser(id);
  }
}
