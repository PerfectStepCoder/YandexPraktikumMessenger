const template = `
<div class="chat-list">
    <h2> {{ title }} </h2>

    <ul>
        {{ charts }}
    </ul>

    {{ chartControl }}

    {{ buttonLogout }}

    {{ buttonProfile }}

    {{ addUserInChat }}

</div>
`;

export default template;
