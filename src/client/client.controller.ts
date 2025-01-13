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
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/CreateClient.dto';
import { UpdateClientDto } from './dto/UpdateClient.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {
    this.clientsService = clientsService;
  }

  @Get('/')
  public async getAllClients(): Promise<any> {
    return await this.clientsService.getAllClients();
  }

  @Get('/:id')
  public async getClientById(@Param('id', new ParseUUIDPipe()) id: string) {
    const client = await this.clientsService.getClientById(id);
    if (!client) throw new NotFoundException('Client not found...');
    return client;
  }

  @Post('/')
  public async createClient(@Body() clientData: CreateClientDto) {
    return await this.clientsService.createClient(clientData);
  }

  @Put('/:id')
  public async updateClientById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() clientData: UpdateClientDto,
  ) {
    if (!(await this.clientsService.getClientById(id)))
      throw new NotFoundException('Client not found...');

    await this.clientsService.updateClientById(id, clientData);
    return { success: true };
  }

  @Delete('/:id')
  public async deleteClientById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.clientsService.getClientById(id)))
      throw new NotFoundException('Client not found...');
    await this.clientsService.deleteClientById(id);
    return { success: true };
  }
}
