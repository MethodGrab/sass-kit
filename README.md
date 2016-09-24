# Sass Kit [![Build Status](https://travis-ci.org/MethodGrab/sass-kit.svg?branch=master)](https://travis-ci.org/MethodGrab/sass-kit) [![npm](https://img.shields.io/npm/v/sass-kit.svg)](https://www.npmjs.com/package/sass-kit)
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


## Responsive
Responsive / media query helpers.

### Usage

#### Basic
An `em` Sass function is required to convert `px` values to `ems`. You can provide one or import the included `functions/em` file as well:

```scss
@import 'node_modules/sass-kit/functions/em';
@import 'node_modules/sass-kit/mixins/responsive';

p {
	color: black;

	@include below( 320px ) {
		color: red;
	}

	@include between( 480px, 500px ) {
		color: cyan;
	}

	@include above( 720px ) {
		color: orange;
	}

	@include landscape() {
		color: green;
	}

	@include portrait() {
		color: blue;
	}
}
```


#### Without conversion
Don't convert the media queries to ems:

```scss
@import 'node_modules/sass-kit/mixins/responsive';

p {
	color: black;

	@include below( 320px, $convert: false ) {
		color: red;
	}

	@include between( 480px, 500px, $convert: false ) {
		color: cyan;
	}

	@include above( 720px, $convert: false ) {
		color: blue;
	}
}
```


#### Dimensions other than width
```scss
@import 'node_modules/sass-kit/functions/em';
@import 'node_modules/sass-kit/mixins/responsive';

p {
	@include above( 720px, height ) {
		color: cyan;
	}
}
```


#### Keywords
You can also use predefined keywords, to do so create a map called `$breakpoints`:

```scss
@import 'node_modules/sass-kit/functions/em';
@import 'node_modules/sass-kit/mixins/responsive';

// these are the predefined keywords which you can overwrite
$breakpoints: (
	small  : 320px,
	medium : 640px,
	large  : 1024px,
	xlarge : 1440px,
	xxlarge: 1920px,
);

p {
	@include above( medium ) {
		color: cyan;
	}
}
```


### API
The following mixins are available:


#### `break( $type: string, $from: value, $to: ?value, $dimension: ?string, $convert: bool )`
The base mixin.

**$type**  
Breakpoint type, one of `'above'`, `'below'`, `'between'`.

**$from**  
Breakpoint start.

**$to**  
Default: `false`  
Breakpoint end, only required for `$type: 'between'`.

**$dimension**  
Default: `'width'`  
Breakpoint dimension, one of `'width'`, `'height'`.

**$convert**  
Default: `true`  
Convert px based `$from` & `$to` values to `ems`.


#### `below( $size: value, $dimension: ?string, $convert: ?bool )`
Include styles **below** `$size`.


#### `above( $size: value, $dimension: ?string, $convert: ?bool )`
Include styles **above** `$size`.


#### `between( $from: value, $to: value, $dimension: ?string, $convert: ?bool )`
Include styles **between** `$from` & `$to`.


#### `landscape()`
Include styles in landscape orientation.


#### `portrait()`
Include styles in portrait orientation.
