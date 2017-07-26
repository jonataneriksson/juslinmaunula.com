<!DOCTYPE html>
<html data-ng-app="juslinmaunulacom">
    <head>
    <title>Juslin Maunula</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <base href="/">
    <!-- bower:css -->
    <link rel="stylesheet" href="assets/components/normalize.css/normalize.min.css" />
    <!-- endbower -->
    <link rel="stylesheet" href="assets/stylesheets.css" />
    </head>
    <body data-ng-class="bodyClass">

        <section class="overlay" data-ui-view="overlay" data-ng-class="overlayClass"></section>

        <main data-ui-view="main" data-ng-class="wrapperClass" autoscroll="false"></main>

        <footer data-ui-view="footer"></footer>

        <!-- bower:js -->
        <!--[if lte IE 9]>
            <script src="assets/components/es5-shim/es5-sham.min.js"></script>
            <script src="assets/components/es5-shim/es5-shim.min.js"></script>
        <![endif]-->
        <?php echo js('/assets/components/angular/angular.min.js'); ?>
        <?php echo js('/assets/components/angular-ui-router/release/angular-ui-router.min.js'); ?>
        <?php echo js('/assets/components/picturefill/dist/picturefill.min.js'); ?>
        <?php echo js('/assets/components/angular-picture/src/angular-picture.js'); ?>
        <?php echo js('/assets/components/angular-sanitize/angular-sanitize.min.js'); ?>
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
