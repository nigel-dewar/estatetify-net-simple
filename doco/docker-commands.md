
# Docker Commands Cheat Sheet

## Simple container commands

- ### Remove any running containers

```powershell

docker rm $(docker ps -qa)

```

- ### See containers

```text

docker ps

```

## Docker Compose commands

- ### See containers

```text

docker-compose ps

```

- ### stop and remove

```text

docker-compose stop ; docker-compose rm -f

```
