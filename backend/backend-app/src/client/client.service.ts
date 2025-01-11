import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  public createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
    return this.prisma.client.create({
      data: clientData,
    });
  }

  public getAllClients(): Promise<Client[]> {
    return this.prisma.client.findMany({
      include: {
        orders: true,
      },
    });
  }

  public getClientById(id: Client['id']): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });
  }

  public updateClientById(
    id: Client['id'],
    clientData: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.prisma.client.update({
      where: { id },
      data: clientData,
    });
  }

  public deleteClientById(id: Client['id']): Promise<Client> {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
