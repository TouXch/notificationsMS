import { Module } from '@nestjs/common';
import { NotificationResService } from './notification-res.service';
import { NotificationResController } from './notification-res.controller';
import { NatsModule } from '../transport/nats.module';

@Module({
  controllers: [NotificationResController],
  providers: [NotificationResService],
  imports: [NatsModule]
})
export class NotificationResModule {}
