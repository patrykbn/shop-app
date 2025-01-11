import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [ClientsService, PrismaService],
  controllers: [ClientsController],
})
export class ClientModule {}
