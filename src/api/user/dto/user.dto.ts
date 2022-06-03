import { CharacterInterface } from "src/api/characters/dto/character.dto";
import { CreateCharacterInterface } from "src/api/characters/dto/create-character.dto";
import { User } from "../schemas/user.schema";

export class UserDto {
        _id: User;
        username: string;
        email?: string;
        token?: string;
        characters: CreateCharacterInterface[];
}