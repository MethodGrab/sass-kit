# Sass Helpers
> A collection of Sass functions & mixins.


## Install
```bash
npm install --save @methodgrab/sass-helpers
```

## Usage
As these are functions and mixins they can all be imported and will only impact the size of the compiled CSS if used:
```scss
@import 'node_modules/@methodgrab/sass-helpers/index';

h1 { font-size: em( 24px ); }
```

Optionally, the object oriented CSS classes can be imported as well.  
This **will** add to the size of the compiled CSS regardless of if they are used:
```scss
@import 'node_modules/@methodgrab/sass-helpers/index';
@import 'node_modules/@methodgrab/sass-helpers/oo-classes';
```

```html
<div class="u-cf"></div>
<div class="u-visually-hidden"></div>
```
