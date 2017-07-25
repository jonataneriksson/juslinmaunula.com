/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var app = angular.module('juslinmaunulacom', ['ui.router', 'ngSanitize', 'hj.columnify']); //, 'ngAnimate'

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    /* !Fix the trailing slash */
    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path();
        if(path[path.length-1] === '/') {
            return path.substr(0, path.length - 1);
        }
    });

    /* !Clean permalinks */
    $locationProvider.html5Mode(true);

    /* !States */
    $stateProvider
    .state('root', {
      url: '/',
      views: {
        'main' : { templateUrl: 'assets/views/cover.html', controller: 'cover-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      },
      onExit: function($document, $rootScope){angular.element($document).unbind('scroll');}
    }).state('about', {
      url: '/about',
      views: {
        'main' : { templateUrl: 'assets/views/about.html', controller: 'about-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('archive', {
      url: '/archive',
      views: {
        'main' : { templateUrl: 'assets/views/archive.html', controller: 'archive-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('project', {
      url: '/archive/:project',
      views: {
        'main' : { templateUrl: 'assets/views/project.html', controller: 'project-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('project.image', {
      params: { item : null },
      views: {
        'overlay@' : { templateUrl: 'assets/views/image.html', controller: 'image-controller'}
      }
    });

});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var api;
app.factory('api', function($http, $q){
  api = {};
  api.load = function(url){
    var waiter = $q.defer();
      $http.get(url).success(function(data) {
        waiter.resolve(api);
        api.loaded = data;
      });
    return waiter.promise;
  }
  return api
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Transitions */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*app.run(function($rootScope, $state, $urlRouter, $timeout){

    $rootScope.readyToLoad = false

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if(fromState.name && !$rootScope.readyToLoad){
            event.preventDefault();
            event.targetScope.wrapperClass = 'exit';
            $timeout(function(){
                $rootScope.readyToLoad = true;
                $rootScope.wrapperClass = '';
                $state.go(toState.name)
            },1000)
        }
    });

});*/

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Image loader */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.directive('img', function ($rootScope) { return function ($scope, $element) {

    //Hide first
    $element.addClass('hidden-until-loaded');

    //Reserve space first
    var ratio = 0.5//$scope.item.height / $scope.item.width * 100;
    $element.attr('style', 'padding-bottom: '+ratio+'%;height:0 !important;');

    //Show when loaded
	$element.bind("load", function (event){
		if(event.target.complete){
		    $element.removeAttr('style');
			$element.removeClass('hidden-until-loaded');
		}
	});

}});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Cover controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('cover-controller', function ($scope, $window, $document, $rootScope, api) {
    $rootScope.bodyClass = 'White';
    $scope.wrapperClass = 'Cover';
    api.load('/api/').then(function(){
        $scope.cover = api.loaded.cover;
    });
    angular.element($document).bind("scroll", function(){
        zero = this.body.scrollTop;
        one = this.body.scrollTop + angular.element($window)[0].innerHeight;
        two = this.body.offsetHeight;
        if(one >= two){
            this.body.scrollTop = 1;
        } else if(zero < 0){
            this.body.scrollTop = this.height - angular.element($window)[0].innerHeight-2;
        }
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !About controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('about-controller', function ($scope, $rootScope, api, $anchorScroll) {
    //$anchorScroll();
    $scope.mainClass = 'About two-columns';
    $rootScope.bodyClass = 'White';
    api.load('/api/').then(function(){
        $scope.about = api.loaded.pages.about;
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Archive controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('archive-controller', function ($scope, $rootScope, api, $anchorScroll) {
    //$anchorScroll();
    $scope.mainClass = 'Archive';
    $rootScope.bodyClass = 'Black';
    $scope.items = [];
    api.load('/api/').then(function(){
        $scope.items = api.loaded.pages.archive.items;
    });
    //$scope.items = api.loaded.pages.archive.items;
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Project controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('project-controller', function ($scope, $rootScope, api, $state, $stateParams, $anchorScroll) {
    $anchorScroll();
    $rootScope.bodyClass = 'Black';
    $scope.mainClass = 'Project';
    $scope.currentUrl = window.location.pathname;
    $scope.back = function(){window.history.back();}
    $scope.image = function(){
        $state.go('project.image' , { item : this.$parent.item });
    };
    api.load('/api/?name='+$stateParams.project).then(function(){
        $scope.project = api.loaded.project;
        console.log($scope);
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Image controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('image-controller', function ($scope, $rootScope, $state, $stateParams) {
    $scope.overlayClass = 'Overlay';
    $scope.item = $state.params.item;
    $scope.back = function(){
        $state.go('project');
    }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Footer controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('footer-controller', function (api, $rootScope, $scope, $state, $stateParams) {
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Uniheight Filter */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var layout = {};
app.filter('uniheight', function($filter) { return function(array, margin, treshold) {
  if(array.length){
    //Initialize
    layout.treshold = (window.innerWidth > 600) ? treshold : 1;
    layout.treshold = (window.innerWidth > 2000) ? 4  : treshold;
    layout.maxitems = 4;
    layout.ratiosadded = 0;
    layout.rows = {};
    layout.rownumber = 1;
    //Loop through items
    Object.keys(array).map(function(key) {
      //Init the current item
      var current = array[key];
      current.margin = margin;
      current.ratio = current.width / current.height;
      //Find current rows & If row doesn't exist create a new array
      layout.rows[layout.rownumber] = layout.rows[layout.rownumber] || {};
      //Setup a row to be calculated.
      row = layout.rows[layout.rownumber];
      row.ratiosadded = (!row.ratiosadded) ? 0 : row.ratiosadded;
      row.ratiosadded += parseFloat(current.ratio);
      row.totalwidth = row.totalwidth || 100;
      row.totalwidth -= margin*2;
      row.relativeheight = row.totalwidth/row.ratiosadded;
      //Make sure item array exists.
      row.items = row.items || {};
      //Add the item
      row.items[key] = current;
      //Check if row is wide already and if so add another row.
      if(row.ratiosadded > layout.treshold || Object.keys(row.items).length == layout.maxitems) layout.rownumber ++;
    });
    //Loop through the rows.
    Object.keys(layout.rows).map(function(row) {
      Object.keys(layout.rows[row].items).map(function(key) {
        if(layout.rows[row-1]){ //If previous row exists.
          var delta = (layout.rows[row-1].relativeheight / layout.rows[row].relativeheight);
          array[key].relativeheight = (delta > 0.5) ? layout.rows[row].relativeheight: layout.rows[row-1].relativeheight;
          array[key].relativewidth = (delta > 0.5) ? layout.rows[row].relativeheight * array[key].ratio : layout.rows[row-1].relativeheight * array[key].ratio;
        } else {
          array[key].relativeheight = layout.rows[row].relativeheight;
          array[key].relativewidth = layout.rows[row].relativeheight * array[key].ratio;
        }
      });
    });
  }
  return array;
}});
