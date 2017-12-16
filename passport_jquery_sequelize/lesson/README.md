# Postgres Sequelize Passport Boilerplate + Heroku Push

<h2>Heroku</h2>

* Run ```heroku create```
* Run ```heroku addons:create heroku-postgresql:hobby-dev```
* Run ```heroku config``` to see the environment variable just added
* Resource: https://devcenter.heroku.com/articles/heroku-postgresql
* This line in the config.json is how the database connections in production/heroku:

```"production": {```
    ```"use_env_variable": "DATABASE_URL"```
```}```

<h2>Other</h2>

* You can connect to this database through the credentials they give you
* You can see a breakdown of the credentials if you go to your app's page on heroku and find the database option
![postgres image one](https://github.com/nycda-wdi-jared/postgres_sequelize/blob/master/pg_sequelize_boilerplate/github_images/first.png?raw=true "Postgres Example")
![postgres image two](https://github.com/nycda-wdi-jared/postgres_sequelize/blob/master/pg_sequelize_boilerplate/github_images/second.png?raw=true "Postgres Example")
* You can use those credentials to view your database in postico