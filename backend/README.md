# backend

Some very cool docs.

### Lifecycle

- `yarn makemigration` to generate migration files for outstanding schema changes
- `yarn migrations` to list existing migrations (and whether or not they've been applied)
- `yarn migrate` to apply existing migrations
- `yarn typeorm:cli` to use the CLI for anything else (the above commands are just convenience methods for the CLI)

If you re-run `makemigration` multiple times, it'll generate identical migration files.

The `name` property on the migration class can't be changed, but the filename can
