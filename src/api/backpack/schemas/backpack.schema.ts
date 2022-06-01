import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BackpackDocument = Backpack & Document;

@Schema()
export class Backpack {
  @Prop()
  lvl: number;
}

export const BackpackSchema = SchemaFactory.createForClass(Backpack);