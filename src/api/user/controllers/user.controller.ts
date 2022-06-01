import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

        constructor(private userService: UserService){}

        @Get()
        findAll(): Promise<UserDto[]> {
                return this.userService.getAll();
        }

        @Get(':id')
        getById(@Param('id') id: string): Promise<UserDto> {
                return this.userService.getById(id);
        }

        @Post()
        createUser(@Body() body: UserDto): Promise<UserDto> {
                return this.userService.createUser(body);
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