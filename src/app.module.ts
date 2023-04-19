import { join } from 'path';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mssql',
      ssl: ( process.env.STATE === 'prod' ) 
        ? {
          rejectUnauthorized: false,
          sslmode: 'require',
        } 
        : false as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      extra: {
        trustServerCertificate: true,
      },
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MulterModule,

    CategoriaModule,

    UsuariosModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('Variables de entorno');
    console.log("STATE",  process.env.STATE );
    console.log("host",  process.env.DB_HOST );
    console.log("port",  +process.env.DB_PORT );
    console.log("username",  process.env.DB_USERNAME );
    console.log("password",  process.env.DB_PASSWORD );
    console.log("database",  process.env.DB_NAME );
  }
}
