import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './api/characters/character.module';
import { BackpackModule } from './api/backpack/backpack.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@smlz-cluster.6zy37.mongodb.net/dissention?retryWrites=true&w=majority`,
      }),
    }),
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UserModule,
    CharacterModule,
    BackpackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
