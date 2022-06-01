import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Backpack } from 'src/api/backpack/schemas/backpack.schema';
import { User } from 'src/api/user/schemas/user.schema';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop()
  nickname: string;

  @Prop()
  lvl: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Backpack' }] })
  backpack: Backpack[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

}

export const CharacterSchema = SchemaFactory.createForClass(Character);