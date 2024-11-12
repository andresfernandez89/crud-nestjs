import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateBuyerDTO, UpdateBuyerDTO } from '../dtos/buyer.dto';
import { BuyersService } from '../services/buyers.service';

@ApiTags('Buyers')
@Controller('compradores')
export class BuyersController {
  constructor(private buyersService: BuyersService) {}

  @ApiOperation({ summary: 'Get all buyers' })
  @Get()
  findAll() {
    return this.buyersService.findAll();
  }

  @ApiOperation({ summary: 'Get a buyer by its ID' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.buyersService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new buyer' })
  @Post()
  @ApiBody({ type: CreateBuyerDTO })
  createOperator(@Body() payload: CreateBuyerDTO) {
    return this.buyersService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing buyer by its ID' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateBuyerDTO })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBuyerDTO,
  ) {
    return this.buyersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a buyer by its ID' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.buyersService.delete(id);
  }
}
