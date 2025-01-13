import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrderItemsService } from '../order-items/order-items.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        clientId: orderData.clientId,
        totalPrice: orderData.totalPrice,
        totalItems: orderData.totalItems,
        comment: orderData.comment,
      },
    });

    for (const item of orderData.orderItems) {
      await this.orderItemsService.createOrderItem({
        ...item,
        orderId: order.id,
      });
    }

    return order;
  }

  public getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public getOrderById(id: Order['id']): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public updateOrderById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        updatedAt: new Date(),
      },
    });
  }

  public deleteOrderById(id: Order['id']): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
