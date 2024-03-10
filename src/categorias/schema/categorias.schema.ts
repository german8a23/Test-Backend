import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriaDocument = Categoria & Document;

@Schema()
export class Categoria {

  @Prop({ unique: true})
  id: number;

  @Prop()
  nombre: string;


}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
