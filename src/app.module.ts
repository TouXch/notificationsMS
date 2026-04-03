import { Module } from '@nestjs/common';
import { NotificationResModule } from './notification-res/notification-res.module';

@Module({
  imports: [NotificationResModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
