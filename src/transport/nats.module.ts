import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, natsService } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: natsService,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers
        }
      }
    ])
  ],
  exports: [ClientsModule]
})
export class NatsModule {}
