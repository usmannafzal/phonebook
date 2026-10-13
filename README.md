# Phone Book App

## Important Notes

- Yarn is used as the package manager
- Move `.env.example` to `.env` (see step 1)
- The commit history is well defined
- The `feature/phonebook_cruds` branch contains the full, detailed commit history from development
- Proper error messages in the validations
- US and Pakistani phone numbers are allowed
- Offset pagination added
- Data seeders written using AI

## About

A phone book CRUD app built with Next.js (frontend), NestJS (backend) and PostgreSQL.

- `/` holds the NestJS API
- `/frontend` holds the Next.js app

## Prerequisites

- Node.js 22
- Yarn 4 (this project uses **Yarn** as the package manager, enable it with `corepack enable`)
- Docker Desktop (for the Docker setup), or PostgreSQL running locally (for the local setup)

## 1. Create the .env files

Copy each `.env.example` to `.env`:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Root `.env`:

| Variable | Default | Used for |
|---|---|---|
| `PORT` | `3001` | API port |
| `DB_HOST` | `localhost` | Postgres host (Docker uses `db`) |
| `DB_PORT` | `5432` | Postgres port |
| `DB_USERNAME` | `postgres` | Postgres user |
| `DB_PASSWORD` | `postgres` | Postgres password |
| `DB_DATABASE` | `phonebook_usman_afzal` | Database name |
| `PGADMIN_EMAIL` | `admin@phonebook.com` | pgAdmin login (Docker only) |
| `PGADMIN_PASSWORD` | `admin` | pgAdmin password (Docker only) |

`frontend/.env`:

| Variable | Default | Used for |
|---|---|---|
| `API_URL` | `http://localhost:3001` | Where the Next.js app forwards `/api` calls |

## 2a. Run with Docker (recommended)

```bash
docker compose up --build
```

This starts four containers:

| Service | URL | Notes |
|---|---|---|
| frontend | http://localhost:3000 | The phone book UI |
| pgadmin | http://localhost:5050 | Add a server with host `db` and the DB user and password from `.env` |
| backend | not exposed | Runs migrations and seeders on start, then the API |
| db | not exposed | PostgreSQL 17 with a persistent volume |

The backend and database only live on a private Docker network. The browser talks to the frontend, and the frontend forwards `/api` calls to the backend over that network.

Stop it with `Ctrl+C` or `docker compose down`. Use `docker compose down -v` to also delete the database.

## 2b. Run locally

Backend, from the project root:

```bash
yarn install
yarn db:setup
yarn start:dev
```

`yarn db:setup` creates the database, runs the migrations and seeds the demo contacts. The API runs on http://localhost:3001.

Frontend, in a second terminal:

```bash
cd frontend
yarn install
yarn dev
```

Open http://localhost:3000.

## Database scripts

```bash
yarn db:create          # create the database if it doesn't exist
yarn migration:run      # apply pending migrations
yarn migration:revert   # undo the last migration
yarn migration:show     # list applied and pending migrations
yarn seed               # insert demo contacts (safe to re-run)
```

## API

| Method | Route | Description |
|---|---|---|
| GET | `/contacts?page=1&lastName=smi` | List contacts, 5 per page, optional search by last name |
| GET | `/contacts/:id` | Get one contact |
| POST | `/contacts` | Create a contact |
| PATCH | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

Invalid input returns `400` and an unknown id returns `404`.
