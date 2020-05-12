# Docker SWARM commands

## Docker Context

#### create context
docker context create do-box --docker "host=ssh://user@my-box"

#### switch back to docker desktop
docker context use default

#### Set the context for a single command
docker --context=do-box ps

#### OR set the context globally
docker context use do-box
docker ps

#### OR use the DOCKER_CONTEXT env var
DOCKER_CONTEXT=do-box docker ps
