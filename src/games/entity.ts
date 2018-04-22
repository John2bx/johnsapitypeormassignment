
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {IsIn, ValidateIf} from "class-validator";

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @ValidateIf(element => ['red', 'blue', 'green', 'yellow', 'magenta'].includes(element))
  @Column('text', {nullable:false})
  color: string

  @Column('json', {nullable:false})
  board: string[][]
}