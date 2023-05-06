import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../auth/dto';
import { CreateUserDto } from '../auth/dto';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage } from '../products/entities/product-image.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {

  private readonly logger = new Logger('UsuariosService');

  constructor(

    @InjectRepository(User)
    private readonly usuariosRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,

  ) {}


  async create(createUsuarioDto: CreateUserDto, user: User) {
    try {

      const { ...usuarioData } = createUsuarioDto;
      
      const usuario = this.usuariosRepository.create({
        ...usuarioData
      });

      await this.usuariosRepository.save( usuario )

      return {
        ...usuario
      };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const usuarios = await this.usuariosRepository.find({
      take: limit,
      skip: offset
    })

    const total: number = usuarios.length;

    const usuario: any[] = Object.values(usuarios);

    //usuarios.forEach(usuario => usuario.img = `${ this.configService.get('HOST_API') }/files/usuario/${ usuario.img }`);
    usuarios.forEach(usuario => usuario.img == null ? 'null' : usuario.img = `${ this.configService.get('HOST_API') }/files/usuario/${ usuario.img }`);
    //usuarios.forEach(usuario => usuario.img == null ? null : `${ this.configService.get('HOST_API') }/files/usuario/${ usuario.img }`);

    return {total, usuario};
  }

  async findOne(term: string) {
    let usuario: User;

    usuario = await this.usuariosRepository.findOneBy({ id: term });

    if ( !usuario ) 
      throw new NotFoundException(`usuario with ${ term } not found`);

    usuario.img = usuario.img == null ? '' : `${ this.configService.get('HOST_API') }/files/usuario/${ usuario.img }`;

    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUserDto) {
    const { ...toUpdate } = updateUsuarioDto;

    const usuario = await this.usuariosRepository.preload({ id, ...toUpdate });

    if ( !usuario ) throw new NotFoundException(`User with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {    
      
      await queryRunner.manager.save( usuario );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      usuario.img = usuario.img == null ? '' : `${ this.configService.get('HOST_API') }/files/usuario/${ usuario.img }`;

      return usuario;
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async updateImage(id: string, imgName: string) {

    const usuario = await this.usuariosRepository.preload({ id });

    if ( !usuario ) throw new NotFoundException(`User with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      usuario.img = imgName;
      
      await queryRunner.manager.save( usuario );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return usuario;
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const usuario = await this.findOne( id );
    await this.usuariosRepository.remove( usuario );
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
