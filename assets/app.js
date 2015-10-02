/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var app = angular.module('juslinmaunulacom', ['ui.router', 'ngSanitize']); //'ngAnimate'

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.config(function ($stateProvider, $locationProvider) {

  $stateProvider
    .state('root', {
      url: '/',
      views: {
        'main' : { templateUrl: 'site/templates/cover.html', controller: 'cover-controller'}
        ,'footer' : { templateUrl: 'site/templates/footer.html', controller: 'footer-controller'}           
      },
      onExit: function($document, $rootScope){angular.element($document).unbind('scroll'); $rootScope.bodyClass = '';}
    }).state('about', {
      url: '/about',
      views: {
        'header' : { template: '<h1>About</h1>'}
        ,'main' : { templateUrl: 'site/templates/about.html', controller: 'about-controller'}
        ,'footer' : { templateUrl: 'site/templates/footer.html', controller: 'footer-controller'}        
      }
    }).state('archive', {
      url: '/archive',
      views: {
        'header' : { template: '<h1>Archive</h1>'}      
        ,'main' : { templateUrl: 'site/templates/archive.html', controller: 'archive-controller'}
        ,'footer' : { templateUrl: 'site/templates/footer.html', controller: 'footer-controller'}        
      }
    }).state('project', {
      url: '/archive/:project',
      views: {
        'header' : { template: '<h1>{{title}}</h1>', controller: 'project-header-controller'}     
        ,'main' : { templateUrl: 'site/templates/project.html', controller: 'project-controller'}
        ,'footer' : { templateUrl: 'site/templates/footer.html', controller: 'footer-controller'}                
      }
    });
    
  $locationProvider.html5Mode(true);
    
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var api;
app.factory('api', function($http, $q){
  api = {};
  api.load = function(url){
    var waiter = $q.defer();
    console.log(url);
      $http.get(url).success(function(data) {
        waiter.resolve(api);
        api.loaded = data;
      });
    return waiter.promise;
  }
  return api
});


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('cover-controller', function ($scope, $window, $document, $rootScope) {
    $rootScope.bodyClass = 'Cover';
    $scope.mainClass = 'Cover';
    angular.element($document).bind("scroll", function(){
        zero = this.scrollingElement.scrollTop;
        one = this.scrollingElement.scrollTop + angular.element($window)[0].innerHeight;
        two = this.height;
        if(one >= two){
            this.scrollingElement.scrollTop = 1;
        } else if(zero <= 0){
            this.scrollingElement.scrollTop = this.height - angular.element($window)[0].innerHeight-2;
        }
    });
        
});

app.controller('about-controller', function ($scope, api) {
    $scope.mainClass = 'About two-columns';
    api.load('/api/').then(function(){
        $scope.about = api.loaded.pages.about;
    });
});

app.controller('archive-controller', function ($scope, api) {
    $scope.mainClass = 'Archive';
    api.load('/api/').then(function(){
        $scope.archive = api.loaded.pages.archive;
        //console.log($scope);
    });    
});

app.controller('project-controller', function ($scope, api, $state, $rootScope, $stateParams) {
    $scope.mainClass = 'Project';
    api.load('/api/?name='+$stateParams.project).then(function(){
        $scope.project = api.loaded.project;
        console.log($scope);
    });     
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('footer-controller', function (api, $scope, $state, $rootScope, $stateParams) {
    if(Object.keys($stateParams).length > 0){
        api.load('/api/?name='+$stateParams.project).then(function(){
            $scope.pages = api.loaded.pages;
        });    
    } else {
        api.load('/api/').then(function(){
            $scope.pages = api.loaded.pages;
        });
    }
});