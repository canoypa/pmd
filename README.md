# PMD
Personal Material Design.

# Usage
~~~html
    <!-- using material icons -->
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

    <link rel="stylesheet" href="./pmd.css">
    ...
    <button id="sample-button" class="pmd-button"></button>
~~~

js
~~~javascript
    import * as pmd from './pmd.js';

    const ripple=new pmd.ripple(document.querySelector('#sample-button'));
~~~
