const template = `
<div class="container">
    <h2>{{ title }}</h2>
    <form id="mainForm" action="{{ action }}" method="POST">

        <!-- Поля для изменения информации о пользователе -->
        {{ firstName }}
        {{ secondName }}
        {{ displayName }}
        {{ login }}
        {{ email }}
        {{ phone }}
        <!-- Поле для изменения аватара -->
        {{ avatar }}
        <!-- Поля для изменения пароля -->
        {{ oldPassword }}
        {{ newPassword }}
        <!-- Кнопки -->
        {{ saveButton }}
        {{ resetButton }}
    </form>
</div>

`;

export default template