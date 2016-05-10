<?php require('php/session.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Ephemeral Random Drawing Tool | raohmaru.com</title>
	<meta name="viewport" content="width=device-width">
	<!-- build:css -->
	<link rel="stylesheet" href="css/styles.css" />
	<!-- endbuild -->
</head>
<body>
<div class="wrapper">
	<header class="header" role="banner">
		<h1 class="header__title">Ephemeral Random Drawing Tool <span class="header__version">v0.8.3</span></h1>
		<p><input type="button" value="Pause" class="button" title="Shortcut: P Key" accesskey="P" data-app-comp="pause" />
			<input type="button" value="Save image" class="button" title="Shortcut: Ctrl + S" accesskey="S" data-app-comp="save" /></p>
		<p>Share your work <a href="http://twitter.com" title="Share on Twitter" data-app-comp="share-twitter"><img src="img/twitter.svg" alt="Twitter" width="18" height="18" class="icon" /></a></p>
	</header>
	
	<canvas id="maincanvas" width="500" height="500">
		Your browser doesn't support the canvas element <strong>:(</strong>
	</canvas>
	
	<section class="settings">
		<form>			
			<fieldset class="settings__fieldset">
				<label for="settings-shape">Shape:</label>
				<select name="shape" id="settings-shape">
					<option value="1" selected>Square</option>
					<option value="2">Circle</option>
					<option value="3">Letter</option>
					<option value="4">Line</option>
					<option value="5">Image</option>
				</select>
				<label for="settings-fill">Fill</label>
				<input type="checkbox" name="fill" id="settings-fill" value="1" accesskey="F" checked />
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-effect">Effect</label>
				<select name="effect" id="settings-effect">
					<option value="0">None</option>
					<option value="1" selected>Horizontal</option>
					<option value="2">Vertical</option>
					<option value="3">Rotate</option>
					<option value="4">Scale</option>
					<option value="5">Skew</option>
				</select>
				<label for="settings-reverse">Reverse</label>
				<input type="checkbox" name="reverse" id="settings-reverse" value="1" accesskey="R" />
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-color">Color:</label>
				<select name="color" id="settings-color">
					<option value="0" selected>None</option>
					<option value="1">Marine</option>
					<option value="2">Gold</option>
					<option value="3">Ruby</option>
					<option value="4">Watercolor</option>
					<option value="5">Grass</option>
					<option value="6">Rainbow</option>
					<option value="-1">Random</option>
				</select>
				<label for="settings-mouse">Mouse</label>
				<input type="checkbox" name="mouse" id="settings-mouse" value="1" accesskey="M" checked title="Move the pen with the mouse or the keyboard direction keys" />
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-size">Size:</label>
				<input name="size" id="settings-size" type="range" min="1" max="50" step="1" value="10" />
				<span id="settings-size__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-variation">Variation:</label>
				<input name="variation" id="settings-variation" type="range" min="0" max="30" step="1" value="10" />
				<span id="settings-variation__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-dispersion">Dispersion:</label>
				<input name="dispersion" id="settings-dispersion" type="range" min="0" max="60" step="1" value="15" />
				<span id="settings-dispersion__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-spacing">Spacing:</label>
				<input name="spacing" id="settings-spacing" type="range" min="0" max="10" step="1" value="2" />
				<span id="settings-spacing__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-speed">Speed:</label>
				<input name="speed" id="settings-speed" type="range" min="1" max="10" step="1" value="1" />
				<span id="settings-speed__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-rotation">Rotation:</label>
				<input name="rotation" id="settings-rotation" type="range" min="-90" max="90" step="1" value="0" />
				<span id="settings-rotation__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset">
				<label for="settings-ghost">Ghost:</label>
				<input name="ghost" id="settings-ghost" type="range" min="1" max="10" step="1" value="7" />
				<span id="settings-ghost__value" class="setting__value"></span>
			</fieldset>
			<fieldset class="settings__fieldset settings__footer">
				<input type="button" value="Reset" class="button" data-app-comp="reset" />
			</fieldset>		
		</form>
	</section>
	
	<footer class="footer" role="contentinfo">
		<p><a href="https://github.com/raohmaru/Ephemeral-Random-Drawing-Tool/archive/master.zip" target="_blank">Download <strong>source</strong></a><br>
			or <a href="https://github.com/raohmaru/Ephemeral-Random-Drawing-Tool" target="_blank">View source at GitHub</a>
		</p>
	</footer>
	
	<aside role="complementary" class="siteinfo">
		<p>&copy; 2016 <a href="http://raohmaru.com/" target="_blank">raohmaru.com <img src="http://raohmaru.com/img/raohmaru_logo_white.png" class="siteinfo__logo" alt="raohmaru.com logo" width="26" /></a></p>
	</aside>
</div>

<div class="is-hidden">
	<img src="img/atom.png" alt="Atom symbol" id="imgAsset" />
</div>

<!-- build:js -->
<script src="js/lib/raf.js"></script>
<script src="js/utils.js"></script>
<script src="js/settings.js"></script>
<script src="js/effects.js"></script>
<script src="js/shapes.js"></script>
<script src="js/main.js"></script>
<script src="js/comp/canvas.js"></script>
<script src="js/comp/save.js"></script>
<script src="js/comp/pause.js"></script>
<script src="js/comp/reset.js"></script>
<script src="js/comp/share-twitter.js"></script>
<!-- endbuild -->
<script>
var __csrftoken = '<?php echo $_SESSION['csrf_token']; ?>';
</script>
</body>
</html>