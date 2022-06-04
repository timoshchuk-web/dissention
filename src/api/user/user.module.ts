import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Global()
@Module({
  imports: [
    JwtModule.register({
        secret: 'sadsdgsdg',
        signOptions: { expiresIn: '1d' }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, JwtStrategy],
})
export class UserModule {}
