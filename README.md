# Sass Kit
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
<div class="u-cf">...</div>
<div class="u-visually-hidden">...</div>
```


## API
See the source and tests for examples.

### Functions

#### `str-replace( $source: string, $find: string, $replace: string )` → string
String replacement

#### `strip-units( $val: value )` → number
Remove units from a value

#### `lower-bound( $range: array )` → number
Get the lower bound of an array

#### `upper-bound( $range: array )` → number
Get the upper bound of an array

#### `em( $px: value, $base: ?value )` → value
Convert a pixel value to ems

#### `rem( $px: value, $base: ?value )` → value
Convert a pixel value to rems

#### `image( $file: string, $raw: ?bool )` → url|string
Generate an image asset URL based on `$asset-base-path`

#### `font( $file: string, $raw: ?bool )` → url|string
Generate an font asset URL based on `$asset-base-path`

#### `color( $color: string, $tone: ?string )` → color
Get a value from the color palette

#### `ls( $val: number )` → value
Convert Photoshop "tracking" to CSS letter spacing

#### `nested-border-radius( $outer-size: value, $padding: value )` → value
Calculate correct nested border radii sizes


### Mixins

#### `rem( $property, $values )`
Output dimensions as `rem` with `px` fallbacks

#### `inline-block( $alignment: ?value )`
Cross browser inline block

#### `opacity( $opacity: number )`
Cross browser opacity

#### `ir`
Image replacement #1

#### `font-crush`
Image replacement #2

#### `cf`
Clearfix

#### `hidden`
Hide from both screenreaders and browsers

#### `visually-hidden( $focusable: ?bool )`
Hide only visually, but have it available for screenreaders

#### `invisible`
Hide visually and from screenreaders, but maintain layout

#### `text-ellipsis`
Text overflow ellipsis

#### `hyphenate`
Hyphenate long words

#### `momentum-scroll`
iOS smooth momentum scrolling

#### `font-smoothing( $value: ?string )`
Text antialiasing

#### `antialiased`
Adjust font rendering of light text on dark backgrounds in Chrome on macOS

#### `no-click`
Prevent an element from being clickable and allow the click to pass through to the element below

#### `cover`
Cover an element

#### `alpha-attribute( $attribute, $color, $background )`
Generates a fallback for alpha colors based on the background & foreground colors

#### `font-face( $name: string, $path: string, $weight: ?value, $style: ?value: $exts: ?list )`
Generate all the necessary font-face properties

#### `vertical-center-legacy( $content-el: string )`
Vertical centering for legacy browsers

#### `vertical-center( $includeWidth: ?bool )`
Easy vertical centering of anything in IE9+

#### `center( $includeWidth: ?bool )`
Easy horizontal & vertical centering of anything in IE9+

#### `center-block`
Center block level content

#### `responsive-background-image( $width: value, $height: value, $url: ?value, $size: ?value )`
Responsive background images that maintain their aspect ratio

#### `media-object( $spacing: ?bool )`
Media object pattern

#### `fluid-embed`
Makes media embeds maintain a fixed aspect ratio but adapt to the width of their parent container
