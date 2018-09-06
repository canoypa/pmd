# PMD
Personal Material Design??

[Demos](//cano-ypa.github.io/pmd-demo/)

# Usage
~~~html
    <link rel="stylesheet" href="@/pmd.css">
    <!-- or -->
    <link rel="stylesheet" href="@/ripple/ripple.css">
    ...
    <button id="sample-button" class="pmd-button pmd-ripple"></button>
~~~

js
~~~javascript
    import * as pmd from '@/pmd.js';

    const ripple = new pmd.ripple(document.querySelector('#sample-button'));

    //or
    import { ripple } from '@/pmd.js';
    import { ripple } from '@/ripple/ripple.js';

    const ripple = new ripple(document.querySelector('#sample-button'));
~~~
