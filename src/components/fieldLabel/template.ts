
const template = `
<div class="{{ className }}">
    <label for="{{ labelFor }}">{{ labelText }}</label>
    <input type="{{ type }}" id="{{ labelID }}" name="{{ name }}" placeholder="{{ placeholderText }}" {{ required }}>
</div>
`;

export default template
