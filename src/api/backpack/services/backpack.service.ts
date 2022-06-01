import { Injectable } from '@nestjs/common';

@Injectable()
export class BackpackService {
  getHello(): string {
    return 'Hello Character';
  }
}
