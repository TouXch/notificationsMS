import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsObject,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { NotificationType, NotificationStatus } from '@prisma/client';

export class CreateNotificationDto {
  @IsOptional()
  @IsString()
  sourceEventID?: string;

  @IsUUID()
  torneoID!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  torneoName?: string;

  @IsUUID()
  organizatorID!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  organizatorName?: string;

  @IsOptional()
  @IsUUID()
  participantID?: string;

  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;

  @IsOptional()
  @IsDateString()
  scheduledFor?: string;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;
}