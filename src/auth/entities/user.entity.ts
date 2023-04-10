import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';


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

    @Column('text', {
        default: 'user'
    })
    roles: string|string[];

    @OneToMany(
        () => Product,
        ( product ) => product.user
    )
    product: Product;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
