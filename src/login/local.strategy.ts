import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {LoginService} from "./login.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private loginService: LoginService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log(username);
        const user = await this.loginService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
