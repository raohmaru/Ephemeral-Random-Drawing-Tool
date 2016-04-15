# Ephemeral Random Drawing Tool
A sample tool to show the basics of the [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API),
coded in plain JavaScript.  
Move the mouse or use the keyboard arrows to draw random shapes of random colours and random size
with an endless drawing pen, in a canvas that erases itself. Your drawings while lasts a few seconds on the
screen, that becomes an random, ephemeral work of art.

## Hints
+ Change the settings of the pen or the canvas in the settings dialog.
+ Press `Ctrl+S` to create a snapshot of the canvas in PNG format (it will open in a new tab).
+ Press `P` key to pause or resume the animation.
+ Double click on the canvas to pause or resume the endless drawing pen.

## Browser Support
Tested on Firefox, Chrome and Internet Explorer 11.

## Building
The [gulp](http://gulpjs.com/) file has tasks to build a production version of the tool or lint the JS files.
Available tasks:
+ `grunt` runs [JSHint](http://jshint.com/about/).
+ `grunt build` builds the production version with the source minified.

### License
Released under the WTFPL license.