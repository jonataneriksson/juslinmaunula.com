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
      }
    }).state('about', {
      url: '/about',
      views: {
        'main' : { templateUrl: 'assets/views/about.html', controller: 'about-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('projects', {
      url: '/projects',
      views: {
        'main' : { templateUrl: 'assets/views/archive.html', controller: 'archive-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('installations', {
      url: '/installations',
      views: {
        'main' : { templateUrl: 'assets/views/archive.html', controller: 'archive-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('installation', {
      url: '/installations/:installation',
      views: {
        'main' : { templateUrl: 'assets/views/project.html', controller: 'project-controller'}
        ,'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('project', {
      url: '/projects/:project',
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
/* !Footer controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('footer-controller', function (api, $rootScope, $scope, $state, $stateParams, $location) {
  api.load($location.path()).then(function(data){
    $scope.data = data;
  });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Cover controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('cover-controller', function ($scope, $window, $document, $rootScope, api) {
    $rootScope.bodyClass = 'White';
    $scope.wrapperClass = 'Cover';
    api.load('/cover').then(function(){
      $scope.cover = api.loaded.cover;
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !About controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('about-controller', function ($scope, $rootScope, api, $location) {
    $scope.mainClass = 'About two-columns';
    $rootScope.bodyClass = 'White';
    api.wait($location.path()).then(function(data){
      $scope.about = api.loaded.pages.about;
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Archive controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('archive-controller', function ($scope, $rootScope, api, $location, $timeout) {
    $scope.mainClass = 'Archive';
    $rootScope.bodyClass = 'Black';
    $scope.items = [];
    api.load($location.path()).then(function(){
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, $location.path());
      $scope.site = api.loaded.site;
      $timeout(function(){api.extend($scope.page.children)});
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Project controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('project-controller', function ($scope, $rootScope, api, $location, $timeout) {
    $rootScope.bodyClass = 'Black';
    $scope.mainClass = 'Project';
    $scope.back = function(){window.history.back();}
    api.load($location.path()).then(function(){
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, $location.path());
      $scope.site = api.loaded.site;
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
/* !API Factory */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//Let's save this outside so we can inspect it
var api = {};

var getObjectFromChildrenByPath = function(object, currentpath) {
    if(currentpath == '/') return object;
    currentpath = (currentpath.indexOf('/') === 0) ? currentpath.replace('/','') : currentpath;
    var parts = currentpath ? currentpath.split('/') : [];
    while(parts.length && (object = ('children' in object) ? object.children[parts.shift()] : object[parts.shift()]));
    return object;
}

//Welcome to our factory
app.factory('api', function($http, $rootScope, $q){
  api.loading = {};
  api.loaded = {};
  api.promises = [];
  //The load function
  api.load = function(currentpath){
    //Clean up.
    currentpath = (currentpath.indexOf('/') === 0) ? currentpath.replace('/','') : currentpath;
    //if the url has not been added to the loading
    if(!(currentpath in api.loading)){
      //Let's add a universal listener for the url
      api.loading[currentpath] = $q.defer();
      //The actual get.
      $http.get('api.json?path='+currentpath+'&structure='+(api.loaded.pages ? 1 : 0)).success(function(data) {
        api.loaded = (!api.loaded.pages) ? data : api.loaded;
        storedpage = getObjectFromChildrenByPath(api.loaded.pages, currentpath);
        loadedpage = (typeof data.pages !== 'object') ? data.page : getObjectFromChildrenByPath(data.pages, currentpath);
        Object.assign(storedpage, loadedpage);
        api.loading[currentpath].resolve(api.loaded);
        api.resolve(api.loaded);
        console.log('resolved:' + currentpath);
      });
    }
    //Return a promise
    return api.loading[currentpath].promise;
  }

  //Wait for someone else to load the content.
  api.wait = function(){
    var promise = $q.defer();
    api.promises.push(promise);
    if(Object.keys(api.loaded).length){
      for (first in api.loaded) break;
      api.resolve(api.loaded);
    }
    return promise.promise;
  }

  //Tell the waiting parties to get their data
  api.resolve = function(data){
    api.promises.forEach(function(promise) {
      promise.resolve(data)
    });
  }

  //Tell the waiting parties to get their data
  api.extend = function(pages){
    if(pages){
      if(Object.keys(pages).length){
        Object.keys(pages).map(function(key) {
          if(!pages[key].extended){
            api.load(pages[key].uri).then(function(data){
              if(pages[key].children){
                api.extend(pages[key].children);
              }
            });
          } else {
            if(pages[key].children){
              api.extend(pages[key].children);
            }
          }
        });
      }
    }
  }

  //Return object
  return api
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Uniheight Filter */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var layout = {};
app.filter('uniheight', function($filter) { return function(array, margin, treshold) {
  if(array){
    //Initialize
    layout.treshold = (window.innerWidth > 600) ? treshold : 1;
    layout.treshold = (window.innerWidth > 2000) ? 4  : treshold;
    layout.maxitems = 4;
    layout.ratiosadded = 0;
    layout.rows = {};
    layout.rownumber = 1;
    //Loop through items
    Object.keys(array).map(function(key) {
      console.log(array[key].ratio);
      if(!array[key].ratio) return '';
      //Init the current item
      var current = array[key];
      current.margin = margin;
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Uniheight Helper */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.filter('addratios', function($filter) { return function(array) {
  Object.keys(array).map(function(key) {
    if(!array[key].files) return '';
    array[key].ratio = array[key].files[array[key].strings.thumbnail].ratio;
  });
  return array;
}});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Uniheight Helper */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.filter('imagesfrom', function($filter) { return function(array, page) {
  if(page){
    if('files' in page){
      var object = {};
      Object.keys(array).map(function(key) {
        object[key] = page.files[array[key]];
      });
    }
    return object;
  } else {
    return '';
  }
}});

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
/* !Filter: Visible */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.filter('visible', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if(item.visible) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Filter: First */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.filter('first', function() { return function(input) {
  if(input){
    console.log(input);
    return input[Object.keys(input)[0]]
  } else {
    return '';
  };
}});
