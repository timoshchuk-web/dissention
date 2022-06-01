import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {

        constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

        async getAll(): Promise<UserDto[]> {
                return this.userModel.find().populate('characters').exec();
        }

        async getById(id: string): Promise<UserDto> {
                return this.userModel.findById(id);
        }

        async createUser(user: CreateUserDto): Promise<UserDto> {
                const newUser = new this.userModel(user);
                return newUser.save();
        }

        async deleteUser(id: string): Promise<UserDto> {
                return this.userModel.findByIdAndRemove(id);
        }

        async updateUser(id: string, updatedUser: UserDto): Promise<UserDto> {
                return this.userModel.findByIdAndUpdate(id, updatedUser, {new: false});
        }

}
