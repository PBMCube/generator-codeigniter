<!DOCTYPE html>
<html lang="en">
<head>

	<base href="/"></base>

	<meta charset="utf-8">
	<title><?=$this->config->item('project_slug')?></title>
	<link rel="stylesheet" href="/styles/css/main.css" />

	<link rel="stylesheet" href="/scss/all.scss" />

    <? if (ENVIRONMENT == 'production') { ?>
        <script type="text/javascript">console = { log: function() {}, assert: function() {} }</script>
    <? } else { ?>
        <script type="text/javascript">try { console.assert(1); } catch(e) { console = { log: function() {}, assert: function() {} } }</script>
	<? } ?>

</head>

<body ng-controller="AppCtrl">

<div id="container" ng-controller="HomeCtrl" ui-view="content">

	<h1>Welcome to your CodeIgniter Project <?=$this->config->item('project_slug')?>!</h1>

	<div id="body">
		<p>The page you are looking at is being generated dynamically by CodeIgniter.</p>

		<p>If you would like to edit this page you'll find it located at:</p>
		<code>templates/default/welcome_message.php</code>

		<p>The corresponding controller for this page is found at:</p>
		<code>application/controllers/welcome.php</code>

		<p>This is an altered version of the CodeIgniter Framework</p>
	</div>

	<p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds</p>

</div>

<script src="//maps.googleapis.com/maps/api/js?v=3&sensor=false"></script>

<? if (ENVIRONMENT == 'production') { ?>
    <script src="/build/<?=APP_NAME?>.min.js"></script>

<? } else if (ENVIRONMENT == 'testing') { ?>
    <script src="/dist/<?=APP_NAME?>.js"></script>

<? } else if (ENVIRONMENT == 'development') { ?>

    <script src="/dist/<?=APP_NAME?>-deps.js"></script>
    <script src="/bower_components/requirejs/require.js" data-main="requirejs/main"></script>

<? } ?>

</body>
</html>