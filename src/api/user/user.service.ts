import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
        constructor(
                private jwtService: JwtService,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
        ) {}

        async logInUser(userData: CreateUserDto): Promise<string> {
                const user = await this.userModel.findOne({email: userData.email});
                if (!user) {
                        throw new UnauthorizedException('User does not exist');
                }
                if (userData.password !== user.password) {
                        throw new UnauthorizedException('Incorrect credentials');
                }
                const {password, ...profile} = user;
                return this.signUser(user);
        }

        signUser(userData: User): string {
                return this.jwtService.sign({sub: userData.username, email: userData.email}, {secret: process.env.JWT_SECRET, expiresIn: '1h'});
        }

        async createUser(userData: CreateUserDto): Promise<UserDto> {
                const newUser = new this.userModel(userData);
                return newUser.save();
        }

  async getAll(): Promise<UserDto[]> {
    return this.userModel.find().populate('characters').exec();
  }

  async getById(id: string): Promise<UserDto> {
    return this.userModel.findById(id);
  }

  async deleteUser(id: string): Promise<UserDto> {
    return this.userModel.findByIdAndRemove(id);
  }

  async updateUser(id: string, updatedUser: UserDto): Promise<UserDto> {
    return this.userModel.findByIdAndUpdate(id, updatedUser, { new: false });
  }
}
