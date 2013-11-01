<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title><?=$this->config->item('project_slug')?></title>
	<link rel="stylesheet" href="/styles/css/main.css" />
</head>
<body>

<div id="container">
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

</body>
</html>