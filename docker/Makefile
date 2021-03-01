start:
    docker-sync stop
    docker-sync clean
    cd symfony
    docker volume create --name=symfony-sync
    cd ..
    docker-compose -f docker-compose-dev.yml down
    docker-compose -f docker-compose-dev.yml up -d
    docker-sync start

stop:
    docker-compose stop
    docker-sync stop