import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationResService } from './notification-res.service';
import { CreateNotificationDto } from './dto/create-notification-re.dto';
import { UpdateNotificationReDto } from './dto/update-notification-re.dto';

@Controller()
export class NotificationResController {
  constructor(private readonly notificationResService: NotificationResService) {}

  @MessagePattern('createNotification')
  create(@Payload() createNotificationReDto: CreateNotificationDto) {
    return this.notificationResService.create(createNotificationReDto);
  }

  @MessagePattern('findAllbyUser')
  findAllbyUser(@Payload() userID: string) {
    return this.notificationResService.findAllbyUser(userID);
  }

  @MessagePattern('markAsReadNotification')
  markAsRead(@Payload() nID: string) {
    return this.notificationResService.markAsRead(nID);
  }

  @MessagePattern('markAllAsReadNotification')
  markAllAsRead(@Payload() userID: string) {
    return this.notificationResService.markAllAsRead(userID);
  }

  @MessagePattern('findOneNotification')
  findOne(@Payload() id: string) {
    return this.notificationResService.findOne(id);
  }

  @MessagePattern('updateNotification')
  update(@Payload() payloadData: { id: string, updateNotificationReDto: UpdateNotificationReDto}) {
    return this.notificationResService.update(payloadData.id, payloadData.updateNotificationReDto);
  }

  @MessagePattern('removeNotification')
  remove(@Payload() id: string) {
    return this.notificationResService.remove(id);
  }
}