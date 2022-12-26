import { Module } from '@nestjs/common';
import {LoginService} from "./login.service";
import {LoginController} from "./login.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constant";
import {UsersService} from "../users/users.service";
import {JwtStrategy} from "./jwt.strategy";

console.log(jwtConstants.secret);

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'qwertyy',
            signOptions: { expiresIn: '60s' },
        }),],
    controllers: [LoginController],
    providers: [LoginService, LocalStrategy, JwtService, UsersService,  JwtStrategy]
})
export class LoginModule {}
