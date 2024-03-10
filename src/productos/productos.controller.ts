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











// import { Controller, Get, Post, Put, Delete, Body, Param, Query, Res } from '@nestjs/common';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { ProductosService } from './productos.service';
// import { ProductoDTO } from './dto/create-producto.dto';
// import { Producto } from './schema/producto.schema';


// @Controller('productos')
// @ApiTags('productos')
// export class ProductosController {
//   producto: Producto | PromiseLike<Producto>;
//   constructor(private readonly productosService: ProductosService) { }

//   @Post()
//   @ApiOperation({ summary: 'Crear un nuevo producto' })
//   @ApiResponse({ status: 201, description: 'El producto ha sido creado exitosamente' })
//   async crearProducto(@Body() productoDTO: ProductoDTO): Promise<Producto> {
//     return await this.productosService.crearProducto(productoDTO);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Obtener todos los productos' })
//   @ApiResponse({ status: 200, description: 'La lista de productos se ha obtenido exitosamente' })
//   async obtenerProductos(): Promise<Producto[]> {
//     return await this.productosService.obtenerProductos();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Obtener un producto por su ID' })
//   @ApiResponse({ status: 200, description: 'El producto ha sido encontrado exitosamente', type: Producto })
//   async obtenerProductoPorId(@Param('id') id: string): Promise<Producto> {
//     return await this.productosService.obtenerProductoPorId(id);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Actualizar un producto por su ID' })
//   @ApiResponse({ status: 200, description: 'El producto ha sido actualizado exitosamente', type: Producto })
//   async actualizarProducto(@Param('id') id: string, @Body() productoDTO: ProductoDTO): Promise<Producto> {
//     return await this.productosService.actualizarProducto(id, productoDTO);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Eliminar un producto por su ID' })
//   @ApiResponse({ status: 200, description: 'El producto ha sido eliminado exitosamente' })
//   async eliminarProducto(@Param('id') id: string): Promise<void> {
//     await this.productosService.eliminarProducto(id);
//   }

//   @Get('buscar/:filtro')
//   async buscarProductos(@Param('filtro') filtro: string): Promise<Producto[]> {
//     return this.productosService.buscarProductos(filtro);
//   }

// }






















































































// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { fileFilter, renameImage } from './helpers/images.helper';
// import { Response } from 'express';

// @ApiOperation({ summary: 'Mostrar una imagen' })
// @ApiResponse({ status: 201, description: 'La imagen se ha mostrado exitosamente...' })
// @Get('imagenes/:filename')
// verImagen(@Param('filename') filename: string, @Res() response: Response) {
//   return response.sendFile(filename, { root: 'upload' });
// }


// @ApiOperation({ summary: 'Guardar una imagen' })
// @ApiResponse({ status: 201, description: 'La imagen se ha guardado exitosamente...' })
// @Post('upload')
// @UseInterceptors(FileInterceptor('file', {
//   storage: diskStorage({
//     destination: './upload',
//     filename: renameImage
//   }),
//   fileFilter: fileFilter
// }))
// uploadFile(@UploadedFile() file: Express.Multer.File) {
//   console.log(file);
// }


// @Get('buscar/nombre/:nombre')
// @ApiOperation({ summary: 'Buscar productos por nombre' })
// @ApiResponse({ status: 200, description: 'La lista de productos se ha obtenido exitosamente' })
// async buscarProductosPorNombre(@Param('nombre') nombre: string): Promise<Producto[]> {
//   return await this.productosService.buscarProductosPorNombre(nombre);
// }

// @Get('buscar/categoria/:categoria')
// @ApiOperation({ summary: 'Buscar productos por categoría' })
// @ApiResponse({ status: 200, description: 'La lista de productos se ha obtenido exitosamente' })
// async buscarProductosPorCategoria(@Param('categoria') categoria: string): Promise<Producto[]> {
//   return await this.productosService.buscarProductosPorCategoria(categoria);
// }