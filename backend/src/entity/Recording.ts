import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

// the ! is used because this class is never actually initiated

@Entity()
export class Recording extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('integer')
  asked!: number

  @Column('integer')
  answered!: number

  @Column('integer')
  unixTs!: number

  @Column('text')
  formattedDate!: string
}
