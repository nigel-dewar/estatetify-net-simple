# from https://creekorful.me/how-to-install-traefik-2-docker-swarm/

# Traefik 2.0 Setup

#### setup network

docker network create --driver=overlay traefik-public

#### Deploy Traefik

docker stack deploy traefik -c traefik.yaml

### Deploy Traefik test ( from test dir)
docker stack deploy traefik -c traefik-test.yaml

#### Deploy Hello-world

docker stack deploy helloworld -c hello-world.yaml

## start the docker-compose traefik starter file

docker-compose up -d reverse-proxy

