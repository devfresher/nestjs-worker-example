import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from '../interface/notification-strategy.interface';
import { NotificationPayload } from '../types/notification-payload';

@Injectable()
export class SmsNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(SmsNotificationStrategy.name);

  async send(payload: NotificationPayload): Promise<void> {
    this.logger.log(`Sending SMS to ${payload.to}: ${payload.body}`);
  }
}
