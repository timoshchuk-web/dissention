import { Types } from "mongoose";
import { User } from "src/api/user/schemas/user.schema";

export class CreateCharacterInterface {
        user: User;
        nickname: string;
        lvl: number;
        _id?: string;
}