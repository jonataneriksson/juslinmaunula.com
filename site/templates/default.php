<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2//EN">
<html data-ng-app="juslinmaunulacom">
    <head>
    <title>Juslin Maunula</title>
    <meta charset="utf-8">
    <base href="/">    
    <!-- bower:css -->
    <link rel="stylesheet" href="../../assets/components/normalize.css/normalize.css" />
    <link rel="stylesheet" href="../../assets/components/animate-css/animate.css" />
    <!-- endbower -->
    <link rel="stylesheet" href="assets/stylesheets.css" />    
    </head>
    <body ng-class="bodyClass">

        <main data-ui-view="main" data-ng-class="mainClass" autoscroll="false"></main>
        <footer data-ui-view="footer"></footer>
           
        <!-- bower:js -->
        <script src="../../assets/components/picturefill/dist/picturefill.js"></script>
        <script src="../../assets/components/angular/angular.js"></script>
        <script src="../../assets/components/angular-picture/src/angular-picture.js"></script>
        <script src="../../assets/components/angular-animate/angular-animate.js"></script>
        <script src="../../assets/components/angular-sanitize/angular-sanitize.js"></script>
        <script src="../../assets/components/angular-ui-router/release/angular-ui-router.js"></script>
        <!-- endbower -->
        <script src="assets/app.js"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-53633146-2', 'auto');
            ga('send', 'pageview');
        </script>     
    </body>
</html>
