@echo off

set database=realestate_identity_dev
set backupFile=dev-identity.before.backup.sql

echo Backup %database% to %backupFile%
mysqldump -u dev %database% > backups\%backupFile%