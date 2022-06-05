import { Optional } from "@nestjs/common";
import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
        @IsString()
        @IsOptional()
        required: false
        username?: string;

        @IsEmail()
        @IsNotEmpty()
        email: string

        @IsString()
        @IsNotEmpty()
        password: string;
}