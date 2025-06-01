const template = `
<div class="container">
    <h2>{{ title }}</h2>
    <form id="main-form" action="{{ action }}" method="POST">

        <!-- Поля для изменения информации о пользователе -->
        {{ firstName }}
        {{ secondName }}
        {{ displayName }}
        {{ login }}
        {{ email }}
        {{ phone }}
        <!-- Поле для изменения аватара -->
        <div id="avatar-img">
          {{ avatar }}
        </div>
        <!-- Поля для изменения пароля -->
        {{ oldPassword }}
        {{ newPassword }}
        <!-- Кнопки -->
        {{ homeButton }}
        {{ saveButton }}

    </form>
</div>

`;

export default template;
