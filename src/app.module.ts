import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {WishlistModule} from "./wishlist/wishlist.module";
import {MongooseModule} from "@nestjs/mongoose";
import {CatalogModule} from "./catalog/catalog.module";
import {MulterModule} from "@nestjs/platform-express";
import {UsersModule} from "./users/users.module";
import {LoginModule} from "./login/login.module";
import {ElementModule} from "./element/element.module";
import {ComboModule} from "./combo/combo.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {ConfigModule} from "@nestjs/config";

console.log(join(__dirname, '..', '/public/uploads'));

@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGODB_URI),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public' , 'uploads'),
          serveRoot: '/public'
      }),
      WishlistModule,
      CatalogModule,
      UsersModule,
      LoginModule,
      ElementModule,
      ComboModule,
      MulterModule.register({
          dest: './public/uploads',
      }),
      ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
