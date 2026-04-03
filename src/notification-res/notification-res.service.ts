import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification-re.dto';
import { UpdateNotificationReDto } from './dto/update-notification-re.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
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

  findAll() {
    return `This action returns all notificationRes`;
  }

  findOne(id: string) {
    return `This action returns a #${id} notificationRe`;
  }

  update(id: string, updateNotificationReDto: UpdateNotificationReDto) {
    return `This action updates a #${id} notificationRe`;
  }

  remove(id: string) {
    return `This action removes a #${id} notificationRe`;
  }
}
