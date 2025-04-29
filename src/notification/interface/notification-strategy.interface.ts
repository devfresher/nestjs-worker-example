export interface NotificationStrategy {
  send(payload: any): Promise<void>;
}
