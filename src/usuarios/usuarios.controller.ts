import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUserDto } from '../auth/dto';
import { CreateUserDto } from '../auth/dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entity';
import { Auth, GetUser } from '../auth/decorators';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ValidRoles } from '../auth/interfaces';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'User was created', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(@Body() createUsuarioDto: CreateUserDto, @GetUser() user: User) {
    return this.usuariosService.create(createUsuarioDto, user);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto ) {
    return this.usuariosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('term') term: string) {
    return this.usuariosService.findOne(term);
  }

  @Patch(':id')
  update( 
            @Param('id') id: string, 
            @Body() 
            updateUsuarioDto: UpdateUserDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
