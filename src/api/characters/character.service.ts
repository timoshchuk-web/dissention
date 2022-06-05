import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterInterface } from './dto/character.dto';
import { CreateCharacterInterface } from './dto/create-character.dto';
import { Character, CharacterDocument } from './schemas/character.schema';

@Injectable()
export class CharacterService {

        constructor(
                private eventEmitter: EventEmitter2,
                @InjectModel(Character.name) private characterModel: Model<CharacterDocument>
        ) {}

        async getAll(): Promise<CharacterInterface[]> {
                return this.characterModel.find().populate('user').exec();
        }

        async getById(id: string): Promise<CharacterInterface> {
                return this.characterModel.findById(id);
        }

        async createChar(char: CreateCharacterInterface): Promise<Character> {
                const newChar = new this.characterModel(char);
                await Promise.all([
                        newChar.save(),
                        this.eventEmitter.emit('order.created', newChar),
                ])
                return newChar;
        }

        async deleteUser(id: string): Promise<CharacterInterface> {
                return this.characterModel.findByIdAndRemove(id);
        }

        async updateUser(id: string, updatedUser: CharacterInterface): Promise<CharacterInterface> {
                return this.characterModel.findByIdAndUpdate(id, updatedUser, {new: false});
        }
}
