import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './schema/categorias.schema';
import { CategoriaDTO } from './dto/create-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  async findById(id: string): Promise<Categoria> {
    return this.categoriaModel.findById(id).exec();
  }

  async findByNombre(nombre: string): Promise<Categoria[]> {
    return this.categoriaModel.find({ nombre: nombre }).exec();
  }

  async create(categoriaDto: CategoriaDTO): Promise<Categoria> {
    const count = await this.categoriaModel.countDocuments().exec();
    const createdCategoria = new this.categoriaModel({
      id: count + 1,
      nombre: categoriaDto.nombre,
    });
    return createdCategoria.save();
  }

  async editarCategoria(id: string, editarCategoriaData: CategoriaDTO): Promise<void> {
    const categoria = await this.categoriaModel.findById(id).exec();
    if (!categoria) {
      throw new NotFoundException('La categoría no existe');
    }
    categoria.nombre = editarCategoriaData.nombre;
    await this.categoriaModel.findByIdAndUpdate(id, categoria).exec();
  }

  async buscarCategorias(filtro: string): Promise<Categoria[]> {
    const categorias = await this.categoriaModel
      .find({
        $or: [
          { nombre: { $regex: filtro, $options: 'i' } },
        ],
      })
      .exec();
    return categorias;
  }

  async eliminarCategoria(id: string): Promise<Categoria> {
    return this.categoriaModel.findByIdAndRemove(id);
  }
}
