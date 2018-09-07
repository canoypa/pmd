# Snackbar
snackbar.

# Usage
## HTML
~~~html
    <div id="sample-snackbar" class="pmd-snackbar">
        <div class="pmd-snackbar-text"></div>
        <button class="pmd-snackbar-action-button"></button>
    </div>
~~~
## js
~~~javascript
    const snackbar = new pmd.snackbar(document.querySelector('#sample-snackbar'));

    snackbar.create({
        massage: massage,
        actionText: ok
    });
~~~

# Methods
Method | Description
--- | ---
`create(options)` | create snackbar

## options...
Method | Description
--- | ---
`massage` | massage
`actionText` | action text
`actionHandler` | action handler
`vertical` | vertical position
`horizontal` | horizontal position
`timeout` | timeout
