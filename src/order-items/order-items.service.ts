import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  public createOrderItem(
    orderItemData: Omit<OrderItem, 'id'>,
  ): Promise<OrderItem> {
    return this.prisma.orderItem.create({
      data: orderItemData,
    });
  }

  public getAllOrderItems(): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({
      include: {
        order: true,
        product: true,
      },
    });
  }

  public getOrderItemById(id: OrderItem['id']): Promise<OrderItem | null> {
    return this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });
  }

  public updateOrderItemById(
    id: OrderItem['id'],
    orderItemData: Omit<OrderItem, 'id'>,
  ): Promise<OrderItem> {
    return this.prisma.orderItem.update({
      where: { id },
      data: orderItemData,
    });
  }

  public deleteOrderItemById(id: OrderItem['id']): Promise<OrderItem> {
    return this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
