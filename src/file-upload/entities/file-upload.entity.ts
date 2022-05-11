import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FileUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  lastModifiedDate: Date;

  @Column()
  ETag: string;

  @Column()
  Location: string;

  @Column()
  Key: string;

  @Column()
  Bucket: string;
}
