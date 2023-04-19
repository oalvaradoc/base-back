import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService],
  imports: [
    TypeOrmModule.forFeature([ Categoria ]),
    AuthModule,
  ],
  exports: [
    CategoriaService,
    TypeOrmModule,
  ]
})
export class CategoriaModule {}
