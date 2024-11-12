import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOperatorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  readonly buyerId: number;
}

export class UpdateOperatorDTO extends PartialType(CreateOperatorDTO) {}
