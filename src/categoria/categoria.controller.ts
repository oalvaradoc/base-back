import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categoria } from './entities/categoria.entity';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ValidRoles } from '../auth/interfaces';

@ApiTags('Categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Product was created', type: Categoria })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(@Body() createCategoriaDto: CreateCategoriaDto, @GetUser() user: User,) {
    return this.categoriaService.create(createCategoriaDto, user);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.categoriaService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoriaService.findOne(term);
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() categoriaDto: UpdateCategoriaDto,
    @GetUser() user: User,
  ) {
    return this.categoriaService.update( id, categoriaDto, user );
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.categoriaService.remove( id );
  }
}
