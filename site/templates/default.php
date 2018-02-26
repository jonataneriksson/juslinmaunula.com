<!DOCTYPE html>
<html data-ng-app="juslinmaunulacom" lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head>
	<title><?php echo $site->title()->html(); ?></title>
	<meta charset="utf-8" />
	<meta name="fragment" content="!" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta name="description" content="<?php echo $site->description()->html() ?>">
	<meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
	<base href="/">
	<?php echo css("assets/stylesheets.css"); ?>

	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
	<!-- ! -->
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

	<meta property="og:title" content="<?php echo $site->title()->value(); ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="<?php echo $site->description()->html(); ?>" />
	<meta property="og:url" content="<?php echo $site->url(); ?>" />
	<meta property="og:image" content="<?php echo $site->url(); ?>/content/<?php echo $site->avatar(); ?>" />

	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
	<!-- !Icons -->
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

	<!--<link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="/assets/icons/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="/assets/icons/favicon-194x194.png" sizes="194x194">
	<link rel="icon" type="image/png" href="/assets/icons/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="/assets/icons/android-chrome-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="/assets/icons/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="/assets/icons/manifest.json">
	<link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="shortcut icon" href="/assets/icons/favicon.ico">
	<meta name="msapplication-TileColor" content="#4e008b">
	<meta name="msapplication-TileImage" content="/assets/icons/mstile-144x144.png">
	<meta name="msapplication-config" content="/assets/icons/browserconfig.xml">
	<meta name="theme-color" content="#4e008b">-->

	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
	<!-- ! -->
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

</head>
    <body data-ng-class="bodyClass">

        <section class="overlay" data-ui-view="overlay" data-ng-class="overlayClass"></section>

        <main data-ui-view="main" data-ng-class="wrapperClass" autoscroll="false"></main>

        <footer data-ui-view="footer"></footer>

        <a class="mobile menu noselect" ng-click="open()">
          <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px" viewBox="0 0 25.7 19.4" xml:space="preserve">
          <path d="M24.7,0H1C0.5,0,0,0.5,0,1v1.8c0,0.6,0.5,1,1,1h23.6c0.6,0,1-0.5,1-1V1C25.7,0.5,25.2,0,24.7,0z M24.7,7.7H1
            c-0.6,0-1,0.5-1,1v1.8c0,0.6,0.5,1,1,1h23.6c0.6,0,1-0.5,1-1V8.8C25.7,8.2,25.2,7.7,24.7,7.7z M24.7,15.5H1c-0.6,0-1,0.5-1,1v1.8
            c0,0.6,0.5,1,1,1h23.6c0.6,0,1-0.5,1-1v-1.8C25.7,15.9,25.2,15.5,24.7,15.5z"/>
          </svg>
        </a>

        <!-- bower:js -->
        <!--[if lte IE 9]>
            <script src="assets/components/es5-shim/es5-sham.min.js"></script>
            <script src="assets/components/es5-shim/es5-shim.min.js"></script>
        <![endif]-->
        <?php echo js('/assets/components/babel-polyfill/browser-polyfill.js'); ?>
        <?php echo js('/assets/components/angular/angular.min.js'); ?>
        <?php echo js('/assets/components/angular-ui-router/release/angular-ui-router.min.js'); ?>
        <?php echo js('/assets/components/picturefill/dist/picturefill.min.js'); ?>
        <?php echo js('/assets/components/angular-picture/src/angular-picture.js'); ?>
				<?php echo js('/assets/components/angular-sanitize/angular-sanitize.js'); ?>
				<?php echo js('/assets/components/angular-resource/angular-resource.min.js'); ?>
				<?php echo js('/assets/components/angular-mailchimp/angular-mailchimp.js'); ?>
        <?php echo js('/assets/components/angular-columnify/angular-columnify.js'); ?>
        <!-- endbower -->
        <script src="assets/app.js"></script>
        <script defer>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-53633146-2', 'auto');
            ga('send', 'pageview');
        </script>
    </body>
</html>
