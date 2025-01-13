import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/CreateOrderItem.dto';
import { UpdateOrderItemDto } from './dto/UpdateOrderItem.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Get('/')
  public async getAllOrderItems(): Promise<any> {
    return await this.orderItemsService.getAllOrderItems();
  }

  @Get('/:id')
  public async getOrderItemById(@Param('id', new ParseUUIDPipe()) id: string) {
    const orderItem = await this.orderItemsService.getOrderItemById(id);
    if (!orderItem) throw new NotFoundException('OrderItem not found...');
    return orderItem;
  }

  @Post('/')
  public async createOrderItem(@Body() orderItemData: CreateOrderItemDto) {
    return await this.orderItemsService.createOrderItem(orderItemData);
  }

  @Put('/:id')
  public async updateOrderItemById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderItemData: UpdateOrderItemDto,
  ) {
    if (!(await this.orderItemsService.getOrderItemById(id)))
      throw new NotFoundException('OrderItem not found...');
    await this.orderItemsService.updateOrderItemById(id, orderItemData);
    return { success: true };
  }

  @Delete('/:id')
  public async deleteOrderItemById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!(await this.orderItemsService.getOrderItemById(id)))
      throw new NotFoundException('OrderItem not found...');
    await this.orderItemsService.deleteOrderItemById(id);
    return { success: true };
  }
}
