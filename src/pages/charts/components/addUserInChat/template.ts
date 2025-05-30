const template = `
<div class="chat-control">
    <style>
        fieldset {
            margin: 8px;
            border: 1px solid silver;
            padding: 8px;    
            border-radius: 4px;
        }
        legend {
            padding: 2px;
            font-size: 18px;    
        }
    </style>
    <form id="mainForm" action="{{ action }}" method="POST">
        <fieldset>
            <legend>Add new user:</legend>
            
            {{ inputUserID }}
            {{ saveUser }}

        </fieldset>
    </form>
</div>
`;

export default template;
