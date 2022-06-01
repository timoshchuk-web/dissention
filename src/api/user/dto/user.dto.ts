import { CharacterInterface } from "src/api/characters/dto/character.dto";
import { CreateCharacterInterface } from "src/api/characters/dto/create-character.dto";

export class UserDto {
        username: string;
        password: string;
        characters: CreateCharacterInterface[];
}