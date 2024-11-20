import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateManufacturerDTO,
  UpdateManufacturerDTO,
} from '../dtos/manufacturer.dto';

import { Manufacturer } from '../entities/manufacturer.entity';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
  ) {}

  async findAll(): Promise<Manufacturer[]> {
    return await this.manufacturerRepo.find({
      relations: ['products'],
    });
  }

  async findById(id: number): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!manufacturer) {
      throw new NotFoundException(
        `The manufacturer with id: #${id} does not exist.`,
      );
    }

    return manufacturer;
  }

  async create(payload: CreateManufacturerDTO): Promise<Manufacturer> {
    const newManufacturer = this.manufacturerRepo.create(payload);
    return this.manufacturerRepo.save(newManufacturer);
  }

  async update(id: number, changes: UpdateManufacturerDTO) {
    const manufacturer = await this.findById(id);
    this.manufacturerRepo.merge(manufacturer, changes);
    return this.manufacturerRepo.save(manufacturer);
  }

  async delete(id: number) {
    return await this.manufacturerRepo.delete(id);
  }
}
