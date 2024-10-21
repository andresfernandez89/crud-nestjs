import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperatorsService } from '../services/operators.service';

@ApiTags('Operators')
@Controller('operadores')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @ApiOperation({
    summary: 'Get a list of orders for a specific operator by their ID',
  })
  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getOrderByUser(id);
  }
}
