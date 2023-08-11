import { CityEntity } from '../../city/entities/city.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'state' })
  export class StateEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;
  
    @Column({ nullable: false })
    name: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => CityEntity, (city) => city.state)
    cities?: CityEntity[];
  }
  