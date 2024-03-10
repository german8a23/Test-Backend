import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria, CategoriaSchema } from './schema/categorias.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Categoria.name,
        schema: CategoriaSchema,
      },
    ]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
