## Deploy

> https://danielsantoso.medium.com/deploy-nest-js-app-using-pm2-in-linux-server-1ad98774940c

## Docker :

# docker-compose up

# STOP locally postgreSQL :

> lsof -i :5432
> docker run --name my-postgres -p 5433:5432 -e POSTGRES_PASSWORD=i343406k postgres

# Migrate the database

> npx prisma migrate dev --name "init"

# Create Resource

> nest g resource alarms

# Update Your Schema File

> npx prisma migrate dev --name add_email_verified_default

> nest generate module auth --no-spec

> pm2 start /home/sait22sait16/IMEX/dist/src/main.js --name "team-pharmacy"

# For docker to connect DB

- docker exec -it imex-postgres-1-1 psql -U myuser

- CREATE DATABASE teamPharmacy;

# Restart the Container

> docker compose down
> docker compose up --remove-orphans
