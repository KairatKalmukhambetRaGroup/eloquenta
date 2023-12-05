#!/bin/bash

# Перемещение в директорию проекта
cd /var/www || exit

# Установка зависимостей через Composer
composer install

# Запуск миграций и сидов Laravel
php artisan migrate --seed
