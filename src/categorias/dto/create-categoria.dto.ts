import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaDTO {

  @ApiProperty()
  @IsString()
  readonly nombre: string;
  
  @ApiProperty()
  readonly id: number;

}

