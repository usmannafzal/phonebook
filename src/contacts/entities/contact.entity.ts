import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @Column({ type: 'varchar', name: 'first_name', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name', length: 50 })
  lastName: string;

  @Column({ name: 'phone_number', length: 30 })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
