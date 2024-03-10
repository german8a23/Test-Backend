import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto } from './schema/producto.schema';
import { ProductoSchema } from './schema/producto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema,
      },
    ]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
