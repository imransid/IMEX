## Docker :

# docker-compose up

# STOP locally postgreSQL :

> lsof -i :5432
> docker run --name my-postgres -p 5433:5432 -e POSTGRES_PASSWORD=i343406k postgres

# Migrate the database

> npx prisma migrate dev --name "init"

# Create Resource

> nest g resource users

# Update Your Schema File


> npx prisma migrate dev --name add_email_verified_default
