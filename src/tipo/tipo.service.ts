import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TipoService {
  private readonly logger = new Logger('TipoService');
  constructor(

    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,

    private readonly dataSource: DataSource,

  ) {}
  async create(createtipoDto: CreateTipoDto) {
    try {

      const { ...tipoData } = createtipoDto;
      
      const tipo = this.tipoRepository.create({
        ...tipoData
      });

      await this.tipoRepository.save( tipo )

      return {
        ...tipo
      };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const tipos = await this.tipoRepository.find({
      take: limit,
      skip: offset
    })

    // return tipos.map( ( tipo ) => ({
    //   "total": tipos.length,
    //   "tipos": tipos
    // }))

    //const total: number = tipos.length;

    //const tipo: any[] = Object.values(tipos);
    return Object.values(tipos);

    //return {total, tipo};
    //return  tipo;
  }

  async findOne(term: string) {
    
    let tipo: Tipo;

    //if ( isUUID(term) ) {
      tipo = await this.tipoRepository.findOneBy({ id: term });
    // } else {
    //   const queryBuilder = this.tipoRepository.createQueryBuilder('prod'); 
    //   tipo = await queryBuilder
    //     .where('UPPER(nombre) =:nombre', {
    //       nombre: term.toUpperCase()
    //     })
    //     .getOne();
    // }


    if ( !tipo ) 
      throw new NotFoundException(`tipo with ${ term } not found`);

    return tipo;
  }

  async update( id: string, updatetipoDto: UpdateTipoDto ) {

    const { ...toUpdate } = updatetipoDto;

    const tipo = await this.tipoRepository.preload({ id, ...toUpdate });

    if ( !tipo ) throw new NotFoundException(`Category with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {          
      await queryRunner.manager.save( tipo );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return tipo;
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const tipo = await this.findOne( id );
    await this.tipoRepository.remove( tipo );
    
  }
  
  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
