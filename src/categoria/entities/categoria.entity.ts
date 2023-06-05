import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'categoria' })
export class Categoria {

    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Category ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Category Name',
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

    @ManyToOne(
        () => User,
        ( user ) => user.categoria,
        { eager: true }
    )
    user: User
}
