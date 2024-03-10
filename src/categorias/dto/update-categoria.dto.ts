import { PartialType } from '@nestjs/swagger';
import { CategoriaDTO } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CategoriaDTO) {}
