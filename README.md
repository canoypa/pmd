# PMD
Personal Material Design??

[Demo](//cano-ypa.github.io/pmd-demo/)

# Usage
~~~html
    <link rel="stylesheet" href="@/pmd.css">
    ...
    <button id="sample-button" class="pmd-button pmd-ripple"></button>
~~~

js
~~~javascript
    import * as pmd from '@/pmd.js';

    const ripple = new pmd.ripple(document.querySelector('#sample-button'));

    //or
    import { ripple as pmd } from '@/pmd.js';
    
    const ripple = new ripple(document.querySelector('#sample-button'));
~~~
