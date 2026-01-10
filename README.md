## Installation

# 1. Install dependency

composer install
npm install

# 2. Buat file environment

cp .env.example .env

# 3. Generate application key

php artisan key:generate

# 4. Jalankan migration database

php artisan migrate

# 5. Jalankan seeder

php artisan db:seed

# 6. Build asset frontend

npm run build

# 7. Jalankan aplikasi

php artisan serve

# 8. Jalankan mode development (opsional)

npm run dev

# atau

composer run dev

## Login

Akun berikut telah disediakan jika sudah jalankan ('php artisan db:seed') :

- **Email:** bagas@example.com
- **Password:** 123
