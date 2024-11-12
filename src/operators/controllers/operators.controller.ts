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
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operators.dto';
import { OperatorsService } from '../services/operators.service';

@ApiTags('Operators')
@Controller('operadores')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @ApiOperation({ summary: 'Get all operators' })
  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of operators to return (default: 100)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Number of operators to skip (default: 0)',
  })
  findAll(
    @Query('limit')
    limit: number = 100,
    @Query('offset') offset: number = 0,
  ) {
    return this.operatorsService.findAll(limit, offset);
  }

  @ApiOperation({ summary: 'Get a operator by its ID' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new operator' })
  @Post()
  @ApiBody({ type: CreateOperatorDTO })
  createOperator(@Body() payload: CreateOperatorDTO) {
    return this.operatorsService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing operator by its ID' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateOperatorDTO })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperatorDTO,
  ) {
    return this.operatorsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a operator by its ID' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.delete(id);
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
