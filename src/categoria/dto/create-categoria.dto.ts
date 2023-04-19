import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
    @ApiProperty({
        description: 'Category name (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    nombre: string;
}
