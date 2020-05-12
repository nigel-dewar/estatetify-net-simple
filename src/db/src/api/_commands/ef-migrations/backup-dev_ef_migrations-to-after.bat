@echo off

set database=realestate_api_dev_migrations
set backupFile=dev-api-ef-migrations.after.backup.sql

echo Backup %database% to %backupFile%
mysqldump -u dev %database% --ignore-table=realestate_api_dev_migrations.__efmigrationshistory > backups\%backupFile%