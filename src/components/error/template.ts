const template = `
<div class="error-container">
    <h1>{{ errorCode }}</h1>
    <h2>{{ errorMessage }}</h2>
    <p>{{ errorDetails }}</p>
    <button onclick="window.location.href = '/'">Go Back to Home</button>
</div>
`;

export default template
