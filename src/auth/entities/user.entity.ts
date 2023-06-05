import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar', {
        nullable: true
    })
    email: string;

    @Column('nvarchar', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bit', {
        default: 1
    })
    isActive: boolean;

    @Column('bit', {
        default: 0
    })
    google: boolean;

    @Column('nvarchar', {
        nullable: true
    })
    img: string;

    @Column('text', {
        default: ['user']
    })
    rol: string|string[];

    @OneToMany(
        () => Product,
        ( product ) => product.user
    )
    product: Product;

    @OneToMany(
        () => Categoria,
        ( categoria ) => categoria.user
    )
    categoria: Categoria;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
