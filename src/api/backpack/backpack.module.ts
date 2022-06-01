import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackpackController } from './controllers/backpack.controller';
import { Backpack, BackpackSchema } from './schemas/backpack.schema';
import { BackpackService } from './services/backpack.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Backpack.name, schema: BackpackSchema }])
  ],
  controllers: [BackpackController],
  providers: [BackpackService],
})
export class BackpackModule {}
