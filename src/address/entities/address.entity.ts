import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({name:'user_id', nullable: false })
  userId: number;

  @Column({ nullable: true })
  complement: string;

  @Column({name:'number', nullable: false })
  numberAddress: number;

  @Column({ nullable: false })
  cep: string;

  @Column({ name:'city_id',nullable: false })
  cityId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
