Области хранения данных:
-БД на Json server
-BFF (Backend fo frontend)
-Store на клиенте (редакс)

Сущности приложения (информационные единицы):

-   пользователь: БД(список пользователей), BFF(сессия текущего пользователя), Store(отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), store (использование роли на клиенте)
-   статья: БД (список статей), store (отображение статей в браузере)
-   комментарий: БД (список комментариев), Store (отображение комментария в браузере)

Таблицы БД:

-   пользователи - users: id / login / password /registered_at / role_id
-   роли - roles : id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема состояния для Store(на клиенте):

-   user: id / login / roleId / session
    -posts: массив post: id / title / imageUrl / publishedAt / commentsCount
    -post: id / title / imageUrl / content/ publishedAt / comments: массив comment: id / author/content / publishedAt
-   users: массив user: id / login / registeredAt / role
