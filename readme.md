
### Create laravel project
```sh
    - laravel new admin
```

### [Install Laravel IDE Helper](https://github.com/barryvdh/laravel-ide-helper).

```sh
    - composer require --dev barryvdh/laravel-ide-helper
    - php artisan ide:generate
```

### Create Dockerfile in root
```sh
    FROM php:7.4-fpm-alpine

    RUN docker-php-ext-install pdo pdo_mysql sockets
    RUN curl -sS https://getcomposer.org/installer​ | php -- \
         --install-dir=/usr/local/bin --filename=composer

    WORKDIR /app
    COPY . .
    RUN composer install

    CMD php artisan serve --host=0.0.0.0
    EXPOSE 8000
    
    CMD php artisan queue:work

```

### Create docker-compose.yml in root
```sh
    version: "3.9"
    services:
      admin:
        build:
          context: ./
          dockerfile: Dockerfile
        volumes:
        - .:/app
        ports:
          - "8000:8000"
        depends_on:
          - admin_db
    
    
      admin_db:
        image: "mysql:5.7.22"
        volumes:
          - ./storage/dbdata:/var/lib/mysql
        ports:
          - "33063:3306"
        environment:
          MYSQL_DATABASE: admin
          MYSQL_USER: root
          MYSQL_PASSWORD: root
          MYSQL_ROOT_PASSWORD: root

```

### Building Docker file
<p>Note : Make sure that your docker is in Linux container </p>

```sh
    - docker-compose up
```

### Connect Database with Mysql Workbench 
```sh
    - Connection Name : Docker Laravel
    - Host Name : 127.0.0.1
    - Username : root
    - Port : 33063
    - Password : root
```

### SSH of Docker Container
```sh
    - docker-compose exec container_name sh
```
##### Example for our case:
```sh
    - docker-compose exec admin sh
```

### Configure DB Connection in .env 
```sh
    DB_CONNECTION=mysql
    DB_HOST=admin_db
    DB_PORT=3306
    DB_DATABASE=admin
    DB_USERNAME=root
    DB_PASSWORD=root
```

### DB Migration
```sh
    - php artisan config:cache
    - php artisan migrate
```
