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
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { UpdateOrderDto } from './dto/UpdateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  @Get('/')
  public async getAllOrders(): Promise<any> {
    return await this.ordersService.getAllOrders();
  }

  @Get('/:id')
  public async getOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getOrderById(id);
    if (!order) throw new NotFoundException('Order not found...');
    return order;
  }

  @Post('/')
  public async createOrder(@Body() orderData: CreateOrderDto) {
    return await this.ordersService.createOrder(orderData);
  }

  @Put('/:id')
  public async updateOrderById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDto,
  ) {
    if (!(await this.ordersService.getOrderById(id)))
      throw new NotFoundException('Order not found...');

    await this.ordersService.updateOrderById(id, orderData);
    return { success: true };
  }

  @Delete('/:id')
  public async deleteOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getOrderById(id)))
      throw new NotFoundException('Order not found...');
    await this.ordersService.deleteOrderById(id);
    return { success: true };
  }
}
