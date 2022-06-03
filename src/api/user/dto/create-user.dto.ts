import { Prop } from "@nestjs/mongoose";
import { CharacterInterface } from "src/api/characters/dto/character.dto";
import { CreateCharacterInterface } from "src/api/characters/dto/create-character.dto";

export class CreateUserDto {
        username?: string;
        email: string
        password: string;
}