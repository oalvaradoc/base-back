import { Module } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { TipoController } from './tipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TipoController],
  providers: [TipoService],
  imports: [
    TypeOrmModule.forFeature([ Tipo ]),
    AuthModule,
  ],
  exports: [
    TipoService,
    TypeOrmModule,
  ]
})
export class TipoModule {}
