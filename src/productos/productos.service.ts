import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schema/producto.schema';
import { ProductoDTO } from './dto/create-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel('Producto') private readonly productoModel: Model<Producto>,
  ) {}


  async crearProducto(productoDTO: ProductoDTO, foto: Express.Multer.File | undefined): Promise<Producto> {
    const count = await this.productoModel.countDocuments().exec();
    const nuevoProducto = new this.productoModel({
      id: count + 1,
      nombre: productoDTO.nombre,
      stock: productoDTO.stock,
      precio: productoDTO.precio,
      foto: productoDTO.foto,
      categoria: productoDTO.categoria,
    });
  
    const savedProducto = await nuevoProducto.save();
  
    return savedProducto;
  }

  async obtenerProductos(): Promise<Producto[]> {
    return this.productoModel.find().exec();
  }

  async obtenerProductoPorId(id: string): Promise<Producto> {
    return this.productoModel.findById(id).exec();
  }

  async actualizarProducto(
    id: string,
    productoDTO: ProductoDTO,
    foto: Express.Multer.File | undefined,
  ): Promise<Producto> {
    const updatedProducto: Partial<Producto> = { ...productoDTO };
    if (foto) {
      updatedProducto.foto = { filename: foto.filename } as Express.Multer.File;
    }
    return this.productoModel.findByIdAndUpdate(id, updatedProducto, {
      new: true,
    });
  }


  async eliminarProducto(id: string): Promise<Producto> {
    return this.productoModel.findByIdAndRemove(id);
  }

  async buscarProductos(filtro: string): Promise<Producto[]> {
    const productos = await this.productoModel
      .find({
        $or: [
          { nombre: { $regex: filtro, $options: 'i' } },
          { categoria: { $regex: filtro, $options: 'i' } },
        ],
      })
      .exec();
    return productos;
  }
}
