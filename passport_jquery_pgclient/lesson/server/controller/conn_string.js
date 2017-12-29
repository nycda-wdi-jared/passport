//export a function that returns a production or development db string
//look for where it's imported in the routes.js & server.js
module.exports = () => {
	return process.env.DATABASE_URL ? process.env.DATABASE_URL : "postgres://" + process.env.POSTGRES_USER + ":" + process.env.POSTGRES_PASSWORD + "@localhost:5432/pg_pass"
}