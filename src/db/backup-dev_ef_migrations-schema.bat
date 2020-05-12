@echo off

set database=realestate_api_dev_migrations
set backupFile=dev-api-ef-migrations-schema.sql

echo Backup %database% to %backupFile%
echo "Dump structure"

mysqldump -u dev %database% --single-transaction --no-data --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > F:\_projects\REAL-ESTATE\db\scripts\%backupFile%
mysqldump -u dev %database% --single-transaction --no-data --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > E:\ScratchSource\db\scripts\%backupFile%
