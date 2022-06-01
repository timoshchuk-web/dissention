import { Controller, Get } from '@nestjs/common';

@Controller('user/characters/bpack')
export class BackpackController {
  @Get()
  findAll(): string {
    return 'This action returns all characters';
  }
}