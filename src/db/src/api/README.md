# Commands

## migrate

.\flyway migrate

## revert a failed migration

.\flyway repair

## check a migration script

.\flyway validate

## Change config files

.\flyway -configFiles=.\conf\dev-compare.conf info

# target versions

You can migrate up to a specific migration version - very handy if you want to build an older version database

flyway -configFiles=./conf/compare.conf -target=4 migrate