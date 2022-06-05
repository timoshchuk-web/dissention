import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
        constructor(
                private jwtService: JwtService,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
        ) {}

        async logInUser(userData: CreateUserDto): Promise<UserDto> {
                const user = await this.userModel.findOne({email: userData.email}).lean();
                if (!user) {
                        throw new UnauthorizedException('User does not exist');
                }
                if (!await bcrypt.compare(userData.password, user.password)) {
                        throw new UnauthorizedException('Incorrect credentials');
                }

                const {password, ...userInfo} = user;
                const res: UserDto = {
                        token: await this.signUser(user),
                        ...userInfo
                }
                
                return res;
        }

        signUser(userData: UserDto): string {
                const payload = {id: userData['_id'], email: userData.email}
                return this.jwtService.sign(payload);
        }

        async createUser(userData: CreateUserDto): Promise<UserDto> {
                const user = await this.userModel.findOne({email: userData.email});
                if (user) {
                        throw new UnauthorizedException('User already exists');
                }

                const newUser = new this.userModel({
                        ...userData,
                        password: await bcrypt.hash(userData.password, 10)
                });

                return await newUser.save();
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
