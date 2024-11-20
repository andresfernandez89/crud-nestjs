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

import {
  CreateManufacturerDTO,
  UpdateManufacturerDTO,
} from '../dtos/manufacturer.dto';

import { ManufacturersService } from '../services/manufacturers.service';

@ApiTags('Manufacturer')
@Controller('fabricantes')
export class ManufacturersController {
  constructor(private manufacturerService: ManufacturersService) {}

  @ApiOperation({ summary: 'Get all manufacturers' })
  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @ApiOperation({ summary: 'Get a manufacturer by its ID' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.manufacturerService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new manufacturer' })
  @Post()
  @ApiBody({ type: CreateManufacturerDTO })
  createManufacturer(@Body() payload: CreateManufacturerDTO) {
    return this.manufacturerService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing manufacturer by its ID' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateManufacturerDTO })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateManufacturerDTO,
  ) {
    return this.manufacturerService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a manufacturer by its ID' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.manufacturerService.delete(id);
  }
}
