import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationPayload } from './types/notification-payload';
import { NotificationChannel } from './enums/channel.enum';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async notify(
    @Body() payload: NotificationPayload,
    @Body() channels: NotificationChannel[],
  ) {
    await this.notificationService.notify(payload, channels);
  }
}
