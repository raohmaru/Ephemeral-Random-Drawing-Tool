# Ephemeral Random Drawing Tool
A sample tool to show the basics of the [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API),
coded in plain JavaScript. No libraries except for the [requestAnimationFrame polyfill](https://gist.github.com/paulirish/1579671).

Move the mouse or use the keyboard arrows to draw random shapes of random colours and random size
with an endless paint brush, in a canvas that erases itself. Your drawings while lasts a few seconds
on the screen, that becomes an random, ephemeral work of art.

[Starg drawing!](https://raohmaru.com/lab/js/erdt/)

## Hints
+ Change the settings of the paint brush or the canvas in the settings dialog at the top right of the screen.
+ Press `Ctrl+S` to save a snapshot of the canvas in PNG format (it will donwload automatically or
prompt to save the file).
+ Press `P` key or double click on the canvas to pause or resume the endless paint brush.

## Browser Support
Compatible with Firefox, Chrome and Internet Explorer 11. Older IE versions are not supported and the
application may crash.  
Not tested on mobile devices.

## Building
The [gulp](http://gulpjs.com/) file contains tasks to build a production version of the tool (concat
and minify CSS and JS, copy assets, lint JavaScript files).

Available tasks:
+ `grunt` runs [JSHint](http://jshint.com/about/).
+ `grunt build` builds the production version with the source minified (run with `--dev` to minify
nothing).

### License
Released under the WTFPL license.
