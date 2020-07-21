# Regin

> [Norse God of Crafstmen](https://en.wikipedia.org/wiki/Regin)

## Deployment

You should be able to run 

```shell
# clone the repo
git clone git@github.com:beardedtim/regin.git && cd regin
# then compose the services together
docker-compose up
```

and have the services running on whatever machine you want to deploy on.
You can also pass `-d` to `docker-compose` to run it in detached mode,
that way you can close out of the SSH session without having to stop
the services:

```shell
# clone the repo
git clone git@github.com:beardedtim/regin.git && cd regin
# then compose the services together in detached mode
docker-compose up -d
```

Be sure to change `.env.pg` and `.env.elasticsearch` to something
other than dummy values.

## Development

You can do the following

```shell
# install deps
yarn
# run services locally for dev
docker-compose -f docker-compose.dev.yml up -d
# run server
yarn dev
```

## Folders

This project is broken up into the following:

- `client`
  - `views`: the `ejs` views to render, including partials and templates
  - `renderer.ts`: the interface between the server and the views
  - `routes.ts`: the file that tells the server what to render on each url

- `infrastructure`
  - `db`: all of the db needs
    - `migrations`: managed by `knex`
    - `seeds`: managed by knex`
    - `index.ts`: the interface to the DB
  - `cache.ts`: all of the cache needs
  - `textsearch.ts`: all of the textsearch needs
    - Not currently used
  - `log.ts`: any and all logging needs

- `routes`
  - `middleware.ts`: the middleware that routes use
  - `errors.ts`: the errors that routes use
  - `v0`: the version 0 api
    - `db.ts`: the routes for the `/db` path
    - `healthcheck.ts`: the routes for the `/healthcheck` path
    - `blog-posts.ts`: the routes for the `/blog` path

- `server`
  - `error.ts`: the errors that the server users
  - `middleware.ts`: global preware that the server users
  - `router.ts`: a typed router to anything to use

- `use-cases`
  - `DB.ts`: the use cases that deal with the DB specifically
  - `Blog.ts`: the use cases that deal with the Blog domain specifically

- `utils`: random files that can be used across folders

- `public`: files that are static and accessible to the public