import { Controller, Get, Param, Post, Body, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriaDTO } from './dto/create-categoria.dto';
import { ApiTags } from '@nestjs/swagger';
import { Categoria } from './schema/categorias.schema';

@Controller('categorias')
@ApiTags('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.categoriasService.findById(id);
  }

  @Put(':id')
  async editarCategoria(@Param('id') id: string, @Body() editarCategoriaData: CategoriaDTO): Promise<void> {
    await this.categoriasService.editarCategoria(id, editarCategoriaData);
  }

  @Delete(':id')
  async eliminarCategoria(@Param('id') id: string): Promise<void> {
    await this.categoriasService.eliminarCategoria(id);
  }

  @Get()
  async findAll(@Query('nombre') nombre?: string) {
    if (nombre) {
      return this.categoriasService.findByNombre(nombre);
    }
    return this.categoriasService.findAll();
  }

  @Post()
  async create(@Body() categoriaDto: CategoriaDTO) {
    return this.categoriasService.create(categoriaDto);
  }

  @Get('buscar/:filtro')
  async buscarCategorias(@Param('filtro') filtro: string): Promise<Categoria[]> {
    return this.categoriasService.buscarCategorias(filtro);
  }


}

