@echo off

set database=realestate_api_dev_migrations
set backupFile=dev-api-ef-migrations-schema.sql
set seedFile=dev-api-ef-migrations-data.sql

echo Backup %database% to %backupFile%
echo "Dump structure"
REM mysqldump -u dev %database% --single-transaction --no-data --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > backups\%backupFile%

mysqldump -u dev %database% --single-transaction --no-data --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > F:\_projects\REAL-ESTATE\db\scripts\%backupFile%
mysqldump -u dev %database% --single-transaction --no-data --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > E:\ScratchSource\db\scripts\%backupFile%

echo "Dump content"
mysqldump -u dev %database% --no-create-info --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > F:\_projects\REAL-ESTATE\db\scripts\%seedFile%
mysqldump -u dev %database% --no-create-info --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > E:\ScratchSource\db\scripts\%seedFile%