const template = `
<div class="chat-area">
    <div class="chat-messages">
    </div>

    <!-- Поле для ввода сообщения -->
    <div class="message-input">
        {{ enterMessage }}
        {{ sendMessage }}
    </div>
</div>
`;

export default template

// <div class="message">
// Hello, how are you?
// </div>
// <div class="message author">
// I'm good, thanks! How about you?
// </div>
// <div class="message">
// Doing great! What’s new?
// </div>