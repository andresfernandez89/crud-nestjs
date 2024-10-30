import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 254 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;
}
