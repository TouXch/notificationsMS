import { HttpStatus, Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification-re.dto';
import { UpdateNotificationReDto } from './dto/update-notification-re.dto';
import { NotificationStatus, PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { natsService } from '../config/services';

@Injectable()
export class NotificationResService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  readonly logger = new Logger('NOTIFICATIONSERVICE');

  constructor(
    @Inject(natsService) private readonly client: ClientProxy,) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from the database');
  }

  async create(createNotificationReDto: CreateNotificationDto) {
    const{ scheduledFor, status, ...rest } = createNotificationReDto;
    const savedNotification = await this.notification.create({
      data: {
        ...rest,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        status: status ?? 'PENDING',
      },
    });
    this.logger.log(
      `Notification saved for organizator ${savedNotification.organizatorID}`,
    );
    this.client.emit('notificationCreated', savedNotification);
    this.logger.log('notification.created emitted');
    return savedNotification;
  }

  findAllbyUser(userID: string) {
    const notifications = this.notification.findMany({
      where: { organizatorID: userID },
    })
    return notifications;
  }

  async markAsRead(nID: string){
    await this.findOne(nID);
    const updatedNotification = await this.notification.update({
      where: { notificationID: nID },
      data: { readAt: new Date(Date.now()),
        status: NotificationStatus.READ
      }
    })
    return updatedNotification;
  }

  markAllAsRead(userID: string){
    return this.notification.updateMany({
      where: {NOT: {status: NotificationStatus.READ},
        OR: [{organizatorID: userID}, {participantID: userID}]
      },
      data: { readAt: new Date(Date.now()),
        status: NotificationStatus.READ
      }
    });
  }

  async findOne(id: string) {
    const notification = this.notification.findUnique({
      where: {notificationID: id}
    });
    if(!notification){
      throw new RpcException({
        satusCode: HttpStatus.NOT_FOUND,
        message: `Notification with id ${id} not found`
      });
    }
    return notification;
  }

  update(id: string, updateNotificationReDto: UpdateNotificationReDto) {
    return `This action updates a #${id} notificationRe`;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.notification.update({
      where: {notificationID: id},
      data: { deleted: true}
    }); 
    return `Notification with id ${id} removed`;
  }
}
