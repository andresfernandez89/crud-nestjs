import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;
  @IsString()
  @IsNotEmpty()
  readonly origin: string;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['name'] as const),
) {}
