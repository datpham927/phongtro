#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Checking database connection..."
# Kiểm tra kết nối cơ sở dữ liệu
if php artisan migrate --pretend; then
    echo "Database connection is working."
else
    echo "Database connection failed!"
    exit 1
fi

echo "Running migrations..."
php artisan migrate --force

echo "Seeding the database..."
php artisan db:seed --class=UserSeeder
