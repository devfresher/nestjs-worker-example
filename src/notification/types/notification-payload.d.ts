export type NotificationPayload = {
  to: string;
  from?: string;
  subject: string;
  body?: string;
  templateName?: string; // e.g., "notification", "welcome"
  replacements?: Record<string, any>; // values to inject into template
  attachments?: any[];
  cc?: string | string[];
  bcc?: string | string[];
};
