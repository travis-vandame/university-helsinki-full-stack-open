# Phonebook Backend

Express server for the Part 3 phonebook application. Provides a RESTful API backed by MongoDB Atlas.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB instance)

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_PROTOCOL=mongodb+srv
DB_HOST=your_mongodb_host
DB_NAME=your_database_name
DB_APP_NAME=your_app_name
PORT=3001
```

## Running

```bash
npm run dev      # Development mode (nodemon auto-restart)
npm run start    # Production mode
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/info` | Returns person count and current date |
| GET | `/api/persons` | Returns all people as JSON |
| GET | `/api/persons/:id` | Returns a person by ID |
| POST | `/api/persons` | Adds or upserts a person (body: `{name, number}`) |
| PATCH | `/api/persons/:id` | Updates a person's phone number |
| DELETE | `/api/persons/:id` | Deletes a person |

`number` field must match `XX-XXXXXXX` format (2-3 digits, dash, at least 6 more digits). `name` has a minimum length of 3 characters.

## Seeding

```bash
node mongo.js                         # List all people
node mongo.js "John Doe" "040-1234567" # Add a person
```

## CLI Tools

`requests/people.rest` contains example REST client requests for manual testing.
