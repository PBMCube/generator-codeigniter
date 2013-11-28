<!DOCTYPE html>
<html class="no-js" lang="en" xmlns:fb="http://ogp.me/ns/fb#">

<head>

    <base href="/"></base>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="google" content="notranslate" />

    <title ng-bind-template="<?=$title?> — {{pageTitle}}"><?=$title?></title>

    <?  if (isset($description, $keywords)) { ?>
        <meta name="description" content="<?=strip_tags($description)?>">
        <meta name="keywords" content="<?=$keywords?>">
        <meta name="author" content="">
    <?  } ?>

    <? if ($device === "tablet") { ?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <? } else { ?>
        <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5" />
    <? } ?>

    <meta name="apple-mobile-web-app-capable" content="yes" />

<!--        <meta property="og:title" content="<?=$title?>" />
    <meta property="og:url" content="<?=base_url()?>" />-->
<!--        <meta property="og:image" content="<?=base_url()?>img/logo.png" />
    <meta property="og:site_name" content="<?=$title?>" />-->

    <link rel="shortcut icon" href="/img/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="/img/apple-touch-icon-precomposed.png">

    <script type="text/javascript">
        document.createElement('header');
        document.createElement('nav');
        document.createElement('article');
        document.createElement('section');
        document.createElement('figure');
        document.createElement('figcaption');
    </script>

    <? if (ENVIRONMENT == 'production') { ?>
        <script type="text/javascript">console = { log: function() {}, assert: function() {} }</script>
    <? } else { ?>
        <script type="text/javascript">try { console.assert(1); } catch(e) { console = { log: function() {}, assert: function() {} } }</script>
    <? } ?>

    <script>
        // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        // ga('create', 'UA-XXX', 'domain.com');
        // ga('send', 'pageview');
    </script>

    <!-- <link rel="stylesheet" href="/scss/all.scss"> -->
    <!-- <link rel="stylesheet" href="/styles/css/all.css?v=<?=APP_VERSION?>"> -->

    <!--[if IE ]>
    <![endif]-->

</head>

<body class="<?=$device?>" ng-controller="AppCtrl">

<? if (ENVIRONMENT == 'production') { ?>
    <script src="/build/<?=APP_NAME?>.min.js?v=<?=APP_VERSION?>"></script>

<? } else if (ENVIRONMENT == 'testing') { ?>
    <script src="/dist/<?=APP_NAME?>.js?v=<?=APP_VERSION?>"></script>

<? } else if (ENVIRONMENT == 'development') { ?>
    <script src="http://localhost:35729/livereload.js"></script>

    <script src="/dist/<?=APP_NAME?>-deps.js"></script>
    <script src="/bower_components/requirejs/require.js" data-main="requirejs/main"></script>

<? } ?>

</body>
</html>
