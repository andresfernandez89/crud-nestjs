import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', length: 254 })
  email: string;

  @Column({ type: 'varchar' })
  image: string;
}
