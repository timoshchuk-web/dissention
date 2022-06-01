import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Character } from 'src/api/characters/schemas/character.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]})
  characters: Character[];

}

export const UserSchema = SchemaFactory.createForClass(User);