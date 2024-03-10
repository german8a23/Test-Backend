import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';


@Module({
    imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    ItemsModule,
    CategoriasModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
