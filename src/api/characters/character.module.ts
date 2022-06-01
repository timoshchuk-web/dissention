import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './controllers/character.controller';
import { Character, CharacterSchema } from './schemas/character.schema';
import { CharacterService } from './services/character.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
