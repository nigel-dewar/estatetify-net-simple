FROM node:12.13.0-alpine AS vue-build-env
WORKDIR /app

COPY ./ui/identity ./

RUN yarn && yarn build


FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
COPY ./identity/IdentityService/*.csproj ./
RUN dotnet restore

# copy everything else and build
COPY ./identity/IdentityService/ ./
COPY --from=vue-build-env /app/dist ./wwwroot

RUN dotnet publish -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
WORKDIR /app
COPY --from=build-env /app/out .
EXPOSE 80/tcp
ENTRYPOINT ["dotnet", "IdentityService.dll"]