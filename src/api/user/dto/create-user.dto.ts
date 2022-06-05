import { Optional } from "@nestjs/common";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
        @IsString()
        username?: string;

        @IsEmail()
        @IsNotEmpty()
        email: string

        @IsString()
        @IsNotEmpty()
        password: string;
}