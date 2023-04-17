import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class CategoriaService {
  [x: string]: any;

  private readonly logger = new Logger('CategoriaService');

  constructor(

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    private readonly dataSource: DataSource,

  ) {}

  async create(createCategoriaDto: CreateCategoriaDto, user: User) {
    try {

      const { ...categoriaData } = createCategoriaDto;
      
      const categoria = this.categoriaRepository.create({
        ...categoriaData,
        user
      });

      await this.categoriaRepository.save( categoria )

      return {
        ...categoria
      };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const categorias = await this.categoriaRepository.find({
      take: limit,
      skip: offset
    })

    // return categorias.map( ( categoria ) => ({
    //   "total": categorias.length,
    //   "categorias": categorias
    // }))

    const total: number = categorias.length;

    const categoria: any[] = Object.values(categorias);

    return {total, categoria};
  }

  async findOne(term: string) {
    
    let categoria: Categoria;

    if ( isUUID(term) ) {
      categoria = await this.categoriaRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.categoriaRepository.createQueryBuilder('prod'); 
      categoria = await queryBuilder
        .where('UPPER(nombre) =:nombre', {
          nombre: term.toUpperCase()
        })
        .getOne();
    }


    if ( !categoria ) 
      throw new NotFoundException(`categoria with ${ term } not found`);

    return categoria;
  }

  async update( id: string, updateCategoriaDto: UpdateCategoriaDto, user: User ) {

    const { ...toUpdate } = updateCategoriaDto;

    const categoria = await this.productRepository.preload({ id, ...toUpdate });

    if ( !categoria ) throw new NotFoundException(`Category with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {    
      categoria.user = user;
      
      await queryRunner.manager.save( categoria );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const categoria = await this.findOne( id );
    await this.categoriaRepository.remove( categoria );
    
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
