# Burn-on-read service

A small "burn-on-read" service built with Express.js and Typescript. Messages are stored on the server and are automatically deleted after the first read.

## Quick Start

1. Install dependencies

```sh
npm install
```

2. Run in development (ts-node/nodemon)

```sh
npm run dev
```

3. Build and start for production

```sh
npm run build
npm run start
```

## Features

- Create a secret text message via a web form
- Generates a single-use link to view the message
- Message is deleted from the server after it is viewed
- Templates with Nunjucks and styling with Pico.css
- Input sanitization using `xss`

## Security & Notes

- User input is sanitized via `xss`
- Messages are currently stored in `src/messages/` as files and deleted on first read.
- UUIDs use Node's built-in `crypto.randomUUID()` to avoid ESM/CJS issues.

**Note**: This is a learning project to explore Nunjucks templating with Express.js and TypeScript and to implement simple file-based storage using Node.js.
