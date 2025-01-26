
const template = `
<div class="login-form">
    <h2>{{ title }}</h2>
    <form id="mainForm" action="{{ action }}" method="POST">
        {{ loginField }}
        {{ passwordField }}
        <div class="buttons">
            {{ submitButton }}
            {{ createAccountButton }}
        </div>
    </form>
</div>
`;

export default template
