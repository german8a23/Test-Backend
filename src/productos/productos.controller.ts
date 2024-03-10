import { Controller, Get, Post, Put, Delete, Body, Param, Query, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { ProductoDTO } from './dto/create-producto.dto';
import { Producto } from './schema/producto.schema';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('productos')
@ApiTags('productos')
export class ProductosController {
  producto: Producto | PromiseLike<Producto>;
  constructor(private readonly productosService: ProductosService) { }


  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'El producto ha sido creado exitosamente' })
  @UseInterceptors(FileInterceptor('foto'))
  async crearProducto(@Body() productoDTO: ProductoDTO, @UploadedFile() foto: Express.Multer.File): Promise<Producto> {
    return await this.productosService.crearProducto(productoDTO, foto);
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'La lista de productos se ha obtenido exitosamente' })
  async obtenerProductos(): Promise<Producto[]> {
    return await this.productosService.obtenerProductos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 200, description: 'El producto ha sido encontrado exitosamente', type: Producto })
  async obtenerProductoPorId(@Param('id') id: string): Promise<Producto> {
    return await this.productosService.obtenerProductoPorId(id);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por su ID' })
  @ApiResponse({ status: 200, description: 'El producto ha sido actualizado exitosamente', type: Producto })
  @UseInterceptors(FileInterceptor('foto'))
  async actualizarProducto(
    @Param('id') id: string,
    @Body() productoDTO: ProductoDTO,
    @UploadedFile() foto: Express.Multer.File,
  ): Promise<Producto> {
    return await this.productosService.actualizarProducto(id, productoDTO, foto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @ApiResponse({ status: 200, description: 'El producto ha sido eliminado exitosamente' })
  async eliminarProducto(@Param('id') id: string): Promise<void> {
    await this.productosService.eliminarProducto(id);
  }

  @Get('buscar/:filtro')
  async buscarProductos(@Param('filtro') filtro: string): Promise<Producto[]> {
    return this.productosService.buscarProductos(filtro);
  }

}
