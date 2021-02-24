
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

```

### Create docker-compose.yml in root
```sh
    version: "3.9"
    services:
      admin:
        build:
          context: ./
          dockerfile: Dockerfile
        ports:
          - "8000:8000"
        depends_on:
          - admin_bd


      admin_bd:
        image: "mysql:5.7.22"
        volumes:
          - ./storage/bddata:/var/lib/mysql
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

