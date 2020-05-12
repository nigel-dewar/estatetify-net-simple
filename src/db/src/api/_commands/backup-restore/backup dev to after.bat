@echo off

set database=realestate_api_dev
set backupFile=dev-api.after.backup.sql

echo Backup %database% to %backupFile%
mysqldump -u dev %database% > backups\%backupFile%