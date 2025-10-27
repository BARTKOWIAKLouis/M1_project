import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity, type ClientId } from '../clients/clients.entity';
import { BookEntity, type BookId } from '../books/entities/book.entity';

export type SaleId = string & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: SaleId;

    @Column({ name: 'client_id', type: 'uuid' })
    clientId: ClientId;
    
    // Reation to the ClientEntity with JoinColumn to the client_id
    @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: ClientEntity;

    @Column({ name: 'book_id', type: 'uuid' })
    bookId: BookId;

    // Reation to the BookEntity with JoinColumn to the book_id
    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity;
}