import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

        constructor(private userService: UserService){}

        @Post('login')
        logInUser(@Body() body: CreateUserDto): Promise<UserDto> {
                return this.userService.logInUser(body);
        }

        @Post('create')
        createUser(@Body() body: CreateUserDto): Promise<{email: string}> {
                return this.userService.signUpUser(body);
        }

        @UseGuards(AuthGuard('jwt'))
        @Get()
        findAll(): Promise<UserDto[]> {
                return this.userService.getAll();
        }

        @Get(':id')
        getById(@Param('id') id: string): Promise<UserDto> {
                return this.userService.getById(id);
        }

        @Delete(':id')
        deleteUser(@Param('id') id: string): Promise<UserDto> {
                return this.userService.deleteUser(id);
        }

        @Put(':id')
        updateUser(@Body() body: UserDto, @Param('id') id: string): Promise<UserDto> {
                return this.userService.updateUser(id, body);
        }

}