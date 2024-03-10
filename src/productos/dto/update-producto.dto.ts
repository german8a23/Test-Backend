import { PartialType } from '@nestjs/swagger';
import { ProductoDTO } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(ProductoDTO) {}
