/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Recipe extends Model<Recipe> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ingredients: string[];

  @Column({
    type: DataType.STRING,
    defaultValue: 'https://res.cloudinary.com/mypersonalprojects/image/upload/c_thumb,w_200,g_face/v1721735544/cook-book/flower_zoglzq.jpg',
  })
  thumbnail: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postedBy: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  postedAt: Date;
}
