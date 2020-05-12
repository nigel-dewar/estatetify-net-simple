# Build Stage
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /src

# Copy in and restore api files
COPY ["./Api/Api.csproj", "Api/"]
COPY ["./EFLinq.Repository/EFLinq.Repository.csproj", "EFLinq.Repository/"]
COPY ["./S3.Repository/S3.Repository.csproj", "S3.Repository/"]
COPY ["./DataAccess.Models/Domain.Models.csproj", "DataAccess.Models/"]
COPY ["./Domain.Entities/Domain.Entities.csproj", "Domain.Entities/"]
COPY ["./DataAccess/DataAccess.csproj", "DataAccess/"]

RUN dotnet restore "./Api/Api.csproj"

# Copy in Tests separately and restore
COPY ["./Api.Tests/Api.Tests.csproj", "Api.Tests/"]
RUN dotnet restore "./Api.Tests/Api.Tests.csproj"

# Copy in everything now 
COPY . .

# Test
ENV TEAMCITY_PROJECT_NAME = ${TEAMCITY_PROJECT_NAME}
RUN dotnet test Api.Tests/Api.Tests.csproj --verbosity=normal

# publish if tests pass
RUN dotnet publish Api/Api.csproj -o /publish

# Runtime Image Stage
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2

# ARG CONNECTION_STRING
# ENV ConnectionStrings:DefaultConnection=${CONNECTION_STRING}

# ARG AUTHORITY_URL
# ENV Authorization:AuthorityUrl=${AUTHORITY_URL}

# HEALTHCHECK --interval=5s --start-period=15s --retries=3 `
#     CMD powershell -command `  
#     try { `
#      $response = iwr http://localhost:5001/password; `
#      if ($response.StatusCode -eq 200) { return 0} `
#      else {return 1}; `
#     } catch { return 1 }

WORKDIR /publish
COPY --from=build-env /publish .
ENTRYPOINT ["dotnet", "Api.dll"]