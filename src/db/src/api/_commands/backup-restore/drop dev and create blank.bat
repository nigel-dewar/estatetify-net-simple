@echo off

set database=realestate_api_dev
set drop="DROP DATABASE IF EXISTS %database%; CREATE DATABASE %database%;"

echo %drop%
mysql -u dev -e %drop%