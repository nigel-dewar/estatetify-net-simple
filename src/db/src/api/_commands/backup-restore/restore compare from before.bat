@echo off

set database=realestate_api_dev_compare
set dropAndCreate="DROP DATABASE IF EXISTS %database%; CREATE DATABASE %database%;"
set backupFile=dev-api.before.backup.sql

echo %dropAndCreate%
mysql -u dev -e %dropAndCreate%

echo Restoring %database% from %backupFile%
mysql -u dev %database% < backups\%backupFile%