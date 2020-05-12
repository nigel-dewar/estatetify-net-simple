@echo off

set database=realestate_api_dev_migrations
set backupFile=dev-api-ef-migrations-data.sql

echo Backup %database% to %backupFile%
echo "Dump content"
mysqldump -u dev %database% --no-create-info --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > backups\%backupFile%