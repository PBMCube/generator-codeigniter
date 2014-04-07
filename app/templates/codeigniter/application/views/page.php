<!DOCTYPE html>
<html class="no-js" lang="en" xmlns:fb="http://ogp.me/ns/fb#" ng-controller="AppCtrl" data-state="{{stateName}}">

<head>

    <base href="/"></base>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="google" content="notranslate" />

    <title ng-bind-template="Project Name — {{pageTitle}}"></title>

    <meta name="description" content="{{metaDescription}}">
    <meta name="keywords" content="{{metaKeywords}}">
    <meta name="author" content="">

    <? if ($device === "tablet") { ?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <? } else { ?>
        <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5" />
    <? } ?>

    <meta name="apple-mobile-web-app-capable" content="yes" />

    <meta property="og:title" content="Project Name — {{pageTitle}}" />
    <meta property="og:url" content="{{currentURL}}" />
    <!-- <meta property="og:image" content="<?=base_url()?>img/logo.png" /> -->
    <!-- <meta property="og:site_name" content="" /> -->

    <link rel="shortcut icon" href="/img/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="/img/apple-touch-icon-precomposed.png">

    <script type="text/javascript">
        document.createElement('header');
        document.createElement('footer');
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

    <link rel="stylesheet" href="/styles/css/all.css?v=<?=APP_VERSION?>">

    <!--[if IE ]>
    <![endif]-->

</head>

<body class="<?=$device?>">

    <div id="main" ui-view="main" autoscroll="false">
        
        <div id="content" ui-view="content" autoscroll="false"></div>
        
    </div>

    <script>
        var app = {};
    </script>

    <script>
      // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      // ga('create', 'UA-XXXXXX-XX', '');
      // ga('require', 'linkid', 'linkid.js');
      // ga('require', 'displayfeatures');
      // ga('send', 'pageview');
    </script>

    <script type="text/javascript">
        // var addthis_config = {
        //     pubid: '',
        //     data_track_addressbar: false
        // };
    </script>

    <!-- <script src="//maps.googleapis.com/maps/api/js?v=3&sensor=false"></script> -->

<? if (ENVIRONMENT == 'production') { ?>
    <script src="/build/<?=APP_NAME?>.min.js?v=<?=APP_VERSION?>"></script>

<!--     <script type="text/javascript">
        var script = document.createElement('script');
        script.async = true;
        script.src = '//s7.addthis.com/js/300/addthis_widget.js#domready=1';
        document.body.appendChild(script);
    </script> -->

<? } else if (ENVIRONMENT == 'testing') { ?>
    <script src="/dist/<?=APP_NAME?>.js?v=<?=APP_VERSION?>"></script>

<?php } else if (ENVIRONMENT == 'development') { ?>
    <!-- <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52f3b04475e83dad"></script> -->

    <script src="/dist/<?=APP_NAME?>-deps.js"></script>
    <script src="/app/scripts/header.js"></script>
    <? foreach ($app_scripts as $dir => $scripts) { ?>
        <? foreach ($scripts as $script) { ?>
            <script src="/app/scripts/<?=$dir?>/<?=$script?>"></script>
        <? } ?>
    <? } ?>
    <script src="/app/scripts/webApp.js"></script>
<?php } ?>

</body>
</html>
