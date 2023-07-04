import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {WishlistModule} from "./wishlist/wishlist.module";
import {MongooseModule} from "@nestjs/mongoose";
import {CatalogModule} from "./catalog/catalog.module";
import {MulterModule} from "@nestjs/platform-express";
import {UsersModule} from "./users/users.module";
import {ElementModule} from "./element/element.module";
import {ComboModule} from "./combo/combo.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {ClassesModule} from "./classes/classes.module";

console.log(process.env.MONGODB_URI);


@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://DASC:1907197619MMMmmm@cluster0.r53qhkl.mongodb.net/?retryWrites=true&w=majority'),
      // ServeStaticModule.forRoot({
      //     rootPath: join(__dirname, '..', 'public' , 'uploads'),
      //     serveRoot: '/uploads',
      //     exclude: ['/api*'],
      // }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'malanka-fe'),   // <-- path to the static files
          exclude: ['/api*'],
      }, {

            rootPath: join(__dirname, '..', 'public' , 'uploads'),
            serveRoot: '/uploads',
           exclude: ['/api*'],
} ),
      WishlistModule,
      CatalogModule,
      UsersModule,
      AuthModule,
      ElementModule,
      ComboModule,
      ClassesModule,
      MulterModule.register({
          dest: './public/uploads',
      }),
      ConfigModule.forRoot({
          isGlobal: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
