import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateOperatorDTO } from '../dtos/operators.dto';
import { OperatorsService } from '../services/operators.service';

@ApiTags('Operators')
@Controller('operadores')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @ApiOperation({ summary: 'Create a new operator' })
  @Post()
  @ApiBody({ type: CreateOperatorDTO })
  createOperator(@Body() payload: CreateOperatorDTO) {
    return this.operatorsService.create(payload);
  }

  @ApiOperation({
    summary: 'Get a list of orders for a specific operator by their ID',
  })
  @Get(':id/pedidos')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getOrderByUser(id);
  }

  @ApiOperation({
    summary: 'Get all tasks',
  })
  @Get('tareas')
  getTasks() {
    return this.operatorsService.getTasks();
  }
}
