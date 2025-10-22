import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ClientId = string & { __brand: 'Client' };

@Entity('clients')
export class ClientEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: ClientId;

    @Column({name: 'first_name', type: 'varchar'})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar'})
    lastName: string;

    @Column({name: 'email', type: 'varchar', unique: true, nullable: true})
    email?: string;

    @Column({name : 'picture', type: 'varchar', nullable: true})
    picture?: string;
}