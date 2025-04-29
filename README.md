# NestJS Worker Error Handling Example

A simple NestJS app demonstrating:

- Adding jobs to a queue (BullMQ)
- Processing jobs with error handling
- Logging contextual info
- Retry strategy and dead-letter handling

## How to Run

1. Make sure Redis is running locally (`localhost:6379`)
2. Clone the repo and install dependencies:

```bash
npm install
npm run start
