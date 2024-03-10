import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class ProductoDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly nombre: string;

  @ApiProperty()
  @IsString()
  readonly stock: string;

  @ApiProperty()
  @IsString()
  readonly precio: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  readonly foto: Express.Multer.File;

  @ApiProperty()
  @IsString()
  readonly categoria: string;
}

