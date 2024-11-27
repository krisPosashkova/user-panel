# User Management Web Application

This is Next.A js user management project created using React and PostgreSQL, the database is hosted on Render. The application includes user authentication, admin panel functions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Implemented functions

-   User Registration: Users can register.
-   User Login: Users can log in and their session is maintained using the JWT token.
-   Admin Panel: After authentication, users can view and manage the list of users.
    Actions include:
    -   Blocking and unblocking users
-   Deleting users
-   Select multiple users for batch operations (Select all/Delete all)
-   Email Uniqueness check: A unique index in the email column in PostgreSQL ensures that there are no duplicate emails.
-   Responsive Layout: The layout is adaptive and works easily on both desktops and mobile devices using the Material UI and Modern CSS Reset.

### Technologies Used

Frontend: Next.js, React, Material UI, Zod
Backend: Node.js, PostgreSQL, bcrypt, jsonwebtoken
Database Hosting: Render
Deploy the applicationt: Vercel [https://user-panel-one.vercel.app/]

---

# Веб-приложение для управления пользователями

Это Next.js проект для управления пользователями, созданный с использованием React и PostgreSQL, база данных размещена на Render. Приложение включает в себя аутентификацию пользователей, функции панели администратора .

### Реализованы функции

-   Регистрация пользователя: Пользователи могут регистрироваться.
-   Логин пользователя: Пользователи могут входить в систему, и их сеанс поддерживается с помощью токена JWT.
-   Панель администратора: После аутентификации пользователи могут просматривать список пользователей и управлять им.
    Действия включают в себя:
    -   Блокировку и разблокировку пользователей
-   Удаление пользователей
-   Выбор нескольких пользователей для пакетных операций (Выбрать всех/Удалить все)
-   Проверка уникальности электронной почты: Уникальный индекс в столбце электронной почты в PostgreSQL гарантирует отсутствие дублирующихся электронных писем.
-   Адаптивный макет: Макет является адаптивным и легко работает как на настольных компьютерах, так и на мобильных устройствах с использованием Material UI и Modern CSS Reset.

---

### Технологии

Frontend: Next.js, React, Material UI, Zod
Backend: Node.js, PostgreSQL, bcrypt, jsonwebtoken
Database Hosting: Render
Deploy the applicationt: Vercel [https://user-panel-one.vercel.app/]
