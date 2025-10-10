## SaaS Integrator

This the new UI of the SaaS Integrator Middleware Platform.

The project utilizes Laravel 12, and Vue 3, and temporarily sqlite DB. The DB will be changed later.

### Installation

Run the following commands one by one

```bash
git clone git@github.com:mehul0360/main-new-ui.git
cd main-new-ui
cp .env.example .env
composer install
php artisan migrate --seed
npm install --legacy-peer-deps
php artisa serve --host=localhost
npm run dev
```

#### Login Credentials:

Use the following credentials to login after installation:
```bash
user@example.com / Password
```
