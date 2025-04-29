import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notification.processor';
import { SmsNotificationStrategy } from './strategies/sms.strategy';
import { EmailNotificationStrategy } from './strategies/email.strategy';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification-queue',
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationProcessor,
    SmsNotificationStrategy,
    EmailNotificationStrategy,
  ],
})
export class NotificationModule {}
