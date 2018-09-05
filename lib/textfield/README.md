# Text Field
text

# Usage
## HTML
~~~html
    <div class="pmd-text-field" id="sample-text-field">
        <input type="text" class="pmd-text-field-input">
        <label class="pmd-floating-label">label</label>
        <div class="pmd-line-ripple"></div>
    </div>
~~~

## js
~~~javascript
    const textField = new pmd.textField(document.querySelector('#sample-text-field'));
~~~

# Methods

Method | Description
--- | ---
`getValue()` | get value.
`setValue(string)` | set value.
