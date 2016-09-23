# Sass Helpers
> A collection of Sass functions & mixins.


## Install
```bash
npm install --save sass-kit
```

## Usage
As these are functions and mixins they can all be imported and will only impact the size of the compiled CSS if used:
```scss
@import 'node_modules/sass-kit/index';

h1 { font-size: em( 24px ); }
```

Optionally, the utility CSS classes can be imported as well.  
This **will** add to the size of the compiled CSS regardless of if they are used:
```scss
@import 'node_modules/sass-kit/index';
@import 'node_modules/sass-kit/util-classes';
```

```html
<div class="u-cf"></div>
<div class="u-visually-hidden"></div>
```
