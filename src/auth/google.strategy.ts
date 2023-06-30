import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import config from '../../config/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import {User} from "../schemas/user.schema";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        // @Inject(config.KEY) private configService: ConfigType<typeof config>,
        //@InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super({
            clientID: '650568311361-ecq49fiqfclgu2rjnu55ms9eb2b8gs9o.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:8080/api/auth/google/callback',
            scope: ['profile', 'email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        console.log(profile);
        const { id, name, emails, photos } = profile;

        const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
        };

        console.log(user);
        done (null, user) ;
        // done(null, user);
    }
}
