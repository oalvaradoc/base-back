import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipo' })
export class Tipo {
    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Type ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Type Name',
        uniqueItems: true
    })
    @Column('text', {
        nullable: true,
    })
    nombre: string;

    @Column('bit', {
        default: 1
    })
    estado: boolean;

}
