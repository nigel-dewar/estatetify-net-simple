
set database=realestate_api_dev_migrations
set drop="DROP DATABASE IF EXISTS %database%; CREATE DATABASE %database%;"

echo %drop%
mysql -u dev -e %drop%

del /F /Q E:\ScratchSource\src\api\DataAccess\Migrations\*.*

SET random=%RANDOM%

cd E:\ScratchSource\src\api\DataAccess

dotnet ef migrations add random --startup-project E:\ScratchSource\src\api\Api\ --context ApplicationDbContext

dotnet ef database update --startup-project E:\ScratchSource\src\api\Api\ --context ApplicationDbContext
