# PMD
Personal Material Design.

# Usage
~~~html
    <!-- using material icons -->
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

    <link rel="stylesheet" href="./pmd.css">
    <!-- or -->
    <link rel="stylesheet" href="./ripple/ripple.css">
    ...
    <button id="sample-button" class="pmd-button"></button>
~~~

js
~~~javascript
    import * as pmd from './pmd.js';

    const ripple = new pmd.ripple(document.querySelector('#sample-button'));

    //or
    import { ripple } from './pmd.js';
    import { ripple } from './ripple/ripple.js';

    const ripple = new ripple(document.querySelector('#sample-button'));
~~~
