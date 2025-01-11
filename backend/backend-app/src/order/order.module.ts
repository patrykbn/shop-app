import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { OrderItemsService } from '../order-items/order-items.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [OrdersService, OrderItemsService, PrismaService],
  controllers: [OrdersController],
})
export class OrderModule {}
