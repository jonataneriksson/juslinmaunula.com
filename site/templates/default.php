<!DOCTYPE html>
<html data-ng-app="juslinmaunulacom">
    <head>
    <title>Juslin Maunula</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <base href="/">
    <!-- bower:css -->
    <link rel="stylesheet" href="assets/components/normalize.css/normalize.css" />
    <!-- endbower -->
    <link rel="stylesheet" href="assets/stylesheets.css" />
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
