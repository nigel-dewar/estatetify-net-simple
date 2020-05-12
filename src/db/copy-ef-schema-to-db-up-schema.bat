copy /Y E:\ScratchSource\db\scripts\dev-api-ef-migrations-schema.sql E:\ScratchSource\db\DbSeeder\SchemaMigrator\Scripts\000-schema.sql

copy /Y F:\_projects\REAL-ESTATE\db\scripts\dev-api-ef-migrations-schema.sql F:\_projects\REAL-ESTATE\db\DbSeeder\SchemaMigrator\Scripts\000-schema.sql

REM set database=realestate_api_dev
REM set drop="DROP DATABASE IF EXISTS %database%; CREATE DATABASE %database%;"

REM echo %drop%
REM mysql -u dev -e %drop%





