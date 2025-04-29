import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { NotificationChannel } from './enums/channel.enum';
import { NotificationPayload } from './types/notification-payload';

@Injectable()
// The Producer Service
export class NotificationService {
  constructor(
    @InjectQueue('notification-queue') private notificationQueue: Queue,
  ) {}
  private readonly logger = new Logger(NotificationService.name);

  async notify(payload: NotificationPayload, channels: NotificationChannel[]) {
    await this.notificationQueue.add(
      'dispatch',
      { payload, channels },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    this.logger.log('Notification dispatched');
  }
}
