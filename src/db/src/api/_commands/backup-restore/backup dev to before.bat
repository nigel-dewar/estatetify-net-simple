@echo off

set database=realestate_api_dev
set backupFile=dev-api.before.backup.sql

echo Backup %database% to %backupFile%
mysqldump -u dev %database% > backups\%backupFile%