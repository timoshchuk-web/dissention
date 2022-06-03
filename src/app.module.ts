import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './api/characters/character.module';
import { BackpackModule } from './api/backpack/backpack.module';
import { JwtStrategy } from './api/strategy/jwt.strategy';


@Module({
  imports: [
    UserModule,
    CharacterModule,
    BackpackModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@smlz-cluster.6zy37.mongodb.net/dissention?retryWrites=true&w=majority`,
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          secret: `${process.env.JWT_SECRET}`,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
