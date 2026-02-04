# ahh Template

Full-stack web application with a React frontend, Express backend, SQLite database, JWT authentication, and admin controls. Everything you need to get started with user management and settings. 

# To do
- Add (insert/edit/delete) to Admin Panel (Now short for AP)
- Add websockets
    - Users Online to AP
- Add a chatbox (messages with websocks)
    - Look at chat convos in AP
- Add posts (Twitter style posts on homepage)
- Ability to ban users without deleting
- Log IP and as much as info about users to DB (After everything else is done)
- Analytics to AP (I love analytics)

---

# Client (Frontend)
Frontend simple base with basic fetch, few pages, working routes and imported tailwind without any css. Perfect to use as a project base.
## Packages
- Vite
- React + Router
- Tailwind
## Useful locations
`./Pages` - All Pages
`./main.jsx` - Router handler (If new page, refrence it here)
`./App.jsx` - App Layout (Only Header and Footer)
## Useful commands
`npm run dev`

---

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
