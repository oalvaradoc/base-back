import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTipoDto {
    @ApiProperty({
        description: 'Type name (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    nombre: string;
}
