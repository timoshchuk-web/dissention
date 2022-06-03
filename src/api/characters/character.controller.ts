import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterInterface } from './dto/character.dto';
import { CreateCharacterInterface } from './dto/create-character.dto';
import { CharacterService } from './character.service';

@Controller('user/characters')
export class CharacterController {
  constructor(private characterService: CharacterService){}

        @Get()
        findAll(): Promise<CharacterInterface[]> {
                return this.characterService.getAll();
        }

        @Get(':id')
        getById(@Param('id') id: string): Promise<CharacterInterface> {
                return this.characterService.getById(id);
        }

        @Post()
        createChar(@Body() body: CreateCharacterInterface): Promise<CreateCharacterInterface> {
                return this.characterService.createChar(body);
        }

        @Delete(':id')
        deleteUser(@Param('id') id: string): Promise<CharacterInterface> {
                return this.characterService.deleteUser(id);
        }

        @Put(':id')
        updateUser(@Body() body: CharacterInterface, @Param('id') id: string): Promise<CharacterInterface> {
                return this.characterService.updateUser(id, body);
        }
}