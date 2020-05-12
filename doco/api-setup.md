# Api Setup

API uses .net core User Secrets manager to store important variables

to setup run from a console, at the src folder level
```
dotnet user-secrets init -p Api/
```

This will setup a user-secret as a guid in startup project in the .proj file, with an ID tag