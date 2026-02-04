# Server (Backend)
Backend base with working database, routes, controllers, auth and few migrations with seeds
## Backend packages
- bcrypt - Encryption for DB
- better-sqlite3 - Database
- express - ofc
- jsonwebtoken - Auth
- knex - DB Quiry builder
## Useful locations
`./db` - Database related stuff
`./controllers` - API Controllers (API logic)
`./models` - API Models (API commands `/getByEmail`)
`./routes` - API Routes (API url routes `api/users`)
`./middlewave` - API Middleware (Error handleing and auth, auth is more important)

## Useful commands
`node index.js`
### Knex
#### New table
Make new table 
`npx knex migrate:make create_users`
Run migration
`npx knex migrate:latest`
Rollback migration
`npx knex migrate:rollback`

#### New data
Make new dataset
`npx knex seed:make users`
Instead of latest its run
`npx knex seed:run`



