import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification-re.dto';

export class UpdateNotificationReDto extends PartialType(CreateNotificationDto) {
}
