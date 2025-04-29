import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { NotificationChannel } from './enums/channel.enum';
import { SmsNotificationStrategy } from './strategies/sms.strategy';
import { EmailNotificationStrategy } from './strategies/email.strategy';

@Processor('notification-queue')
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    private readonly email: EmailNotificationStrategy,
    private readonly sms: SmsNotificationStrategy,
  ) {
    super();
  }

  @OnWorkerEvent('active')
  onActive(job: any) {
    this.logger.log(
      `Processing notification job ${job.name} with id ${job.id}`,
    );
    this.logger.log(`Job data: ${JSON.stringify(job.data)}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: any) {
    this.logger.error(
      `Notification job ${job.name} with id ${job.id} permanently failed after ${job.attempts} attempts`,
    );
  }

  async process(job: any): Promise<void> {
    try {
      const { payload, channels } = job.data;

      for (const channel of channels) {
        switch (channel) {
          case NotificationChannel.EMAIL:
            await this.email.send(payload);
            break;
          case NotificationChannel.SMS:
            await this.sms.send(payload);
            break;
        }
      }

      //   Simulate error
      if (Math.random() > 0.5) throw new Error('Something went wrong!');
    } catch (error) {
      this.logger.error('Error processing job', {
        jobId: job.id,
        message: error.message,
        stack: error.stack,
      });

      throw error; // allow BullMQ to retry or fail
    }
  }
}
