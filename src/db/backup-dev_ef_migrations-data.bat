@echo off

set database=realestate_api_dev_migrations
set backupFile=dev-api-ef-migrations-data.sql

echo Backup %database% to %backupFile%

echo "Dump content"
mysqldump -u dev %database% --no-create-info --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > F:\_projects\REAL-ESTATE\db\scripts\%backupFile%
mysqldump -u dev %database% --no-create-info --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > E:\ScratchSource\db\scripts\%backupFile%
