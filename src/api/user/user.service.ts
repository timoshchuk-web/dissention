import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateCharacterInterface } from '../characters/dto/create-character.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Character } from '../characters/schemas/character.schema';

@Injectable()
export class UserService {
        constructor(
                private jwtService: JwtService,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
        ) {}

        async logInUser(userData: CreateUserDto): Promise<UserDto> {
                const user = await this.userModel.findOne({email: userData.email}).populate('characters').lean();
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

        async signUpUser(userData: CreateUserDto): Promise<{email: string}> {
                const user = await this.userModel.findOne({email: userData.email});
                if (user) {
                        throw new UnauthorizedException('User already exists');
                }
                const newUser = new this.userModel({
                        ...userData,
                        password: await bcrypt.hash(userData.password, 10)
                });
                await newUser.save();
                const {password, email, _id} = newUser;
                return {
                        email: email
                };
        }

        @OnEvent('order.created')
        handleOrderCreatedEvent(payload: Character) {
                console.log(payload);
                this.addCharacterToUser(payload);
        }

        async addCharacterToUser(characterData: Character): Promise<void> {
                const user = await this.userModel.findById(characterData.user);
                if (!user) {
                        throw new NotFoundException('User to update character not found');
                }
                user.characters.push(characterData['_id']);
                await user.save();
        }

        async getById(id: string): Promise<UserDto> {
                const user = await this.userModel.findById(id).populate('characters').lean();
                const {password, ...userInfo} = user;
                return userInfo;
        }

        async getAll(): Promise<UserDto[]> {
                return this.userModel.find().populate('characters').exec();
        }

        async deleteUser(id: string): Promise<UserDto> {
                return this.userModel.findByIdAndRemove(id);
        }

        async updateUser(id: string, updatedUser: UserDto): Promise<UserDto> {
                return this.userModel.findByIdAndUpdate(id, updatedUser, { new: false });
        }
}
