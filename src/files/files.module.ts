import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FilesController],
  providers: [FilesService, UsuariosService],
  imports: [
    TypeOrmModule.forFeature([ User ]),
    ConfigModule, Repository<User>
  ],
  exports: [
    UsuariosService,
    TypeOrmModule,
  ]
})
export class FilesModule {}
