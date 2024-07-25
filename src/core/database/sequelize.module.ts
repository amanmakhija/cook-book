/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { sequelizeProvider } from "./sequelize.provider";

@Module({
    providers: [...sequelizeProvider],
    exports: [...sequelizeProvider],
})

export class SequelizeModule { }