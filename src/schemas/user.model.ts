/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript'; // Use 'sequelize-typescript'

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'https://res.cloudinary.com/mypersonalprojects/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721735403/cook-book/user_nxruod.png',
  })
  profilePicture: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  favouriteRecipes: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
