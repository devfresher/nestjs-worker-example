import { Injectable, Logger } from '@nestjs/common';
import { NotificationPayload } from '../types/notification-payload';
import { NotificationStrategy } from '../interface/notification-strategy.interface';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(EmailNotificationStrategy.name);

  constructor() {}

  async send(payload: NotificationPayload): Promise<void> {
    this.logger.log(`Sending Email to ${payload.to}: ${payload.body}`);
  }
}
