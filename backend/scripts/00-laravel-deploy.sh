#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

# echo "Checking database connection..."
# # Kiểm tra kết nối cơ sở dữ liệu và lưu lỗi vào biến
# if php artisan migrate --pretend; then
#     echo "Database connection is working."
# else
#     echo "Database connection failed!"
#     # In ra thông báo lỗi trực tiếp từ stdout và stderr
#     echo "Error: $(php artisan migrate --pretend 2>&1)"
#     exit 1
# fi
# echo "Running migrations..."
# php artisan migrate --force

# echo "Seeding the database..."
#  php artisan db:seed

#  php artisan migrate:refresh
#  php artisan migrate 
#  php artisan db:seed
#  php artisan serve