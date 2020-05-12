copy /Y E:\ScratchSource\db\scripts\dev-api-ef-migrations-data.sql E:\ScratchSource\db\DbSeeder\MockDataSeeder\Scripts\000-seed-data.sql

copy /Y F:\_projects\REAL-ESTATE\db\scripts\dev-api-ef-migrations-data.sql F:\_projects\REAL-ESTATE\db\DbSeeder\MockDataSeeder\Scripts\000-seed-data.sql


REM set database=realestate_api_dev
REM set drop="DROP DATABASE IF EXISTS %database%; CREATE DATABASE %database%;"

REM echo %drop%
REM mysql -u dev -e %drop%





