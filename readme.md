<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

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
    

```

