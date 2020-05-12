# API

https://stackoverflow.com/questions/57066856/dotnet-ef-not-found-in-net-core-3

When using a DbContext in a different project, you need to target it.

So initialize migrations from the DataAccess project, and target the application that will run the migrations

F:\_projects\REAL-ESTATE\src\api\

# run ef migrations

dotnet ef migrations add "init" -p Persistence/ -s Api/

dotnet ef database update -p Persistence/ -s Api/

# drop database

dotnet ef database drop -p Persistence/ -s Api/

# commands

docker build -t re-api .

docker run --rm re-api ls -alR

docker run --rm -it -p 8080:80 re-api

CLEAN UP DANGLING IMAGES

docker image prune

# create new projects

dotnet new xunit -f netcoreapp2.1

update to readme and again and again