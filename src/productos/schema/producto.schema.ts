import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Express } from 'express';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
  @Prop({ unique: true })
  id: number;

  @Prop()
  nombre: string;

  @Prop()
  stock: string;

  @Prop()
  precio: string;

  @Prop({ type: Object })
  foto: Express.Multer.File;

  @Prop()
  categoria: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
