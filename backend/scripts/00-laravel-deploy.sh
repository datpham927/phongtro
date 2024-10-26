#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Checking database connection..."
# Kiểm tra kết nối cơ sở dữ liệu và lưu lỗi vào biến
ERROR_OUTPUT=$(php artisan migrate --pretend 2>&1)

if [ $? -eq 0 ]; then
    echo "Database connection is working."
else
    echo "Database connection failed!"
    echo "Error: $ERROR_OUTPUT"
    exit 1
fi

echo "Running migrations..."
php artisan migrate --force

echo "Seeding the database..."
php artisan db:seed --class=UserSeeder
