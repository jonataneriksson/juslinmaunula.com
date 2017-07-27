/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var app = angular.module('juslinmaunulacom', ['ui.router', 'ngSanitize', 'ngPicturefill']); //, 'ngAnimate'

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
        'main' : { templateUrl: 'assets/views/cover.html', controller: 'cover-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('about', {
      url: '/about',
      views: {
        'main' : { templateUrl: 'assets/views/about.html', controller: 'about-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('collections', {
      url: '/collections',
      views: {
        'overlay' : { templateUrl: 'assets/views/zoom.html'},
        'main' : { templateUrl: 'assets/views/collections.html', controller: 'collection-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('collection', {
      url: '/collections/:collection',
      views: {
        'overlay' : { templateUrl: 'assets/views/zoom.html'},
        'main' : { templateUrl: 'assets/views/collection.html', controller: 'collection-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('accessories', {
      url: '/accessories',
      views: {
        'overlay' : { templateUrl: 'assets/views/zoom.html'},
        'main' : { templateUrl: 'assets/views/collections.html', controller: 'collection-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('accessoriescollection', {
      url: '/accessories/:collection',
      views: {
        'overlay' : { templateUrl: 'assets/views/zoom.html'},
        'main' : { templateUrl: 'assets/views/collection.html', controller: 'collection-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('projects', {
      url: '/projects',
      views: {
        'main' : { templateUrl: 'assets/views/archive.html', controller: 'archive-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('installations', {
      url: '/installations',
      views: {
        'main' : { templateUrl: 'assets/views/archive.html', controller: 'archive-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('installation', {
      url: '/installations/:installation',
      views: {
        'overlay' : { templateUrl: 'assets/views/zoom.html'},
        'main' : { templateUrl: 'assets/views/project.html', controller: 'project-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('project', {
      url: '/projects/:project',
      views: {
        'overlay' : { templateUrl: 'assets/views/zoom.html'},
        'main' : { templateUrl: 'assets/views/project.html', controller: 'project-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    }).state('press', {
      url: '/press',
      views: {
        'main' : { templateUrl: 'assets/views/press.html', controller: 'press-controller'},
        'footer' : { templateUrl: 'assets/views/footer.html', controller: 'footer-controller'}
      }
    });

});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Scroller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


app.run(function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function() {
     document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Footer controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('footer-controller', function (api, $rootScope, $scope, $state, $stateParams, $location) {
  api.load($location.path()).then(function(data){
    $scope.data = data;
  });
  $scope.open = function(){
    $scope.menuClass = 'mobile';
  }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Cover controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('cover-controller', function ($scope, $location, $timeout, $rootScope, api, queue) {
    //Init
    queue.init();
    $rootScope.bodyClass = 'White';
    $scope.wrapperClass = 'Cover';
    $rootScope.overlayClass = 'hidden';

    api.load('cover').then(function(){
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, 'cover');
      $rootScope.currentSlide = $scope.page.content.slides[0];
      $scope.site = api.loaded.site;
      //Start
      queue.ready().then(function(){
        queue.start();
      });
    });

    $scope.$on('imgloaded', function(event, args){
      if(queue.current==0){
        $scope.switchSlide(3000);
      }
    });

    $scope.$on('imgcreated', function(event, args){
      queue.add(args);
      args.scope.class = 'waiting';
    });

    $scope.$on('imgloaded', function(event, args){
      args.scope.$apply(function(){
        args.scope.class = 'visible';
      });
      queue.next();
    });

    $scope.switchSlide = function(interval){
      $scope.slideShow = $timeout(function() {
        $scope.current = ($scope.current < $scope.last) ? $scope.current +  1 : 0;
        $rootScope.currentSlide = $scope.page.content.slides[$scope.current];
        $scope.switchSlide(interval);
      }, interval);
    }

    $scope.$on('$destroy', function() {
      $timeout.cancel($scope.slideShow);
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !About controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('about-controller', function ($scope, $rootScope, api, $location) {
    $scope.wrapperClass = 'About';
    $rootScope.bodyClass = 'White';
    $rootScope.overlayClass = 'hidden';
    api.wait($location.path()).then(function(data){
      $scope.about = api.loaded.pages.about;
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Collection controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('collection-controller', function ($scope, $rootScope, api, $location, $timeout, queue) {
    queue.init();
    $scope.mainClass = 'Collection';
    $rootScope.bodyClass = 'White';
    $rootScope.overlayClass = 'hidden';
    api.load($location.path()).then(function(){
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, $location.path());
      $scope.parent = getObjectFromChildrenByPath(api.loaded.pages, $scope.page.parentuid);
      $scope.site = api.loaded.site;
      $timeout(function(){api.extend($scope.page.children)});
      queue.ready().then(function(){queue.start();});
    });

    $scope.$on('imgcreated', function(event, args){
      queue.add(args);
      args.scope.class = 'waiting';
    });

    $scope.$on('imgloaded', function(event, args){
      args.scope.$apply(function(){
        args.scope.class = 'visible';
      });
      queue.next();
    });

    $scope.gallery = function(index, files) {
      $rootScope.overlayClass = 'active';
      $rootScope.overlayFiles = files;
      $rootScope.overlayCurrent = index;
      $rootScope.overlayTotal = (Object.keys(files).length);
    }

    $rootScope.overlayBack = function() {
      $rootScope.overlayClass = 'hidden';
    }

    $rootScope.next = function() {
      $rootScope.overlayCurrent = ($rootScope.overlayCurrent < $rootScope.overlayTotal - 1) ? $rootScope.overlayCurrent + 1 : 0;
    }

    $rootScope.prev = function() {
      $rootScope.overlayCurrent = (0 <= $rootScope.overlayCurrent - 1) ? $rootScope.overlayCurrent - 1 : $rootScope.overlayTotal - 1;
    }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Archive controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('archive-controller', function ($scope, $rootScope, api, $location, $timeout) {
    $scope.mainClass = 'Archive';
    $rootScope.bodyClass = 'Black';
    $rootScope.overlayClass = 'hidden';
    api.load($location.path()).then(function(){
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, $location.path());
      api.extend($scope.page.children);
      $scope.site = api.loaded.site;
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Project controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('project-controller', function ($scope, $rootScope, api, $location, $timeout, queue) {
    queue.init();
    $rootScope.bodyClass = 'Black';
    $rootScope.overlayClass = 'hidden';
    $scope.mainClass = 'Project';
    api.load($location.path()).then(function(){
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, $location.path());
      $scope.site = api.loaded.site;
      queue.ready().then(function(){queue.start();});
    });

    $scope.$on('imgcreated', function(event, args){
      queue.add(args);
      args.scope.class = 'waiting';
    });

    $scope.$on('imgloaded', function(event, args){
      args.scope.$apply(function(){
        args.scope.class = 'visible';
      });
      queue.next();
    });

    $scope.gallery = function(index, files) {
      $rootScope.overlayClass = 'active';
      $rootScope.overlayFiles = files;
      $rootScope.overlayCurrent = index;
      $rootScope.overlayTotal = (Object.keys(files).length);
    }

    $rootScope.overlayBack = function() {
      $rootScope.overlayClass = 'hidden';
    }

    $rootScope.next = function() {
      $rootScope.overlayCurrent = ($rootScope.overlayCurrent < $rootScope.overlayTotal - 1) ? $rootScope.overlayCurrent + 1 : 0;
    }

    $rootScope.prev = function() {
      $rootScope.overlayCurrent = (0 <= $rootScope.overlayCurrent - 1) ? $rootScope.overlayCurrent - 1 : $rootScope.overlayTotal - 1;
    }

});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Archive controller */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.controller('press-controller', function ($scope, $rootScope, api, $location, queue) {
    queue.init();
    $scope.mainClass = 'Press';
    $rootScope.bodyClass = 'White';
    $rootScope.overlayClass = 'hidden';
    api.load($location.path()).then(function(){
      $scope.site = api.loaded.site;
      $scope.pages = api.loaded.pages;
      $scope.page = getObjectFromChildrenByPath(api.loaded.pages, $location.path());
      api.extend($scope.page.children);
      queue.ready().then(function(){
        queue.start();
      });
    });

    $scope.$on('imgcreated', function(event, args){
      queue.add(args);
      args.scope.class = 'waiting';
    });

    $scope.$on('imgloaded', function(event, args){
      args.scope.$apply(function(){
        args.scope.class = 'visible';
      });
      queue.next();
    });
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
    layout.maxitems = 4;
    layout.ratiosadded = 0;
    layout.rows = {};
    layout.rownumber = 1;
    //Loop through items
    Object.keys(array).map(function(key) {
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
      row.rowheight = row.totalwidth/row.ratiosadded;
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
          var delta = (layout.rows[row-1].rowheight / layout.rows[row].rowheight);
          array[key].rowheight = (delta > 0.5) ? layout.rows[row].rowheight: layout.rows[row-1].rowheight;
          array[key].relativewidth = (delta > 0.5) ? layout.rows[row].rowheight * array[key].ratio : layout.rows[row-1].rowheight * array[key].ratio;
        } else {
          array[key].rowheight = layout.rows[row].rowheight;
          array[key].relativewidth = layout.rows[row].rowheight * array[key].ratio;
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

app.directive('img', function ($rootScope, $timeout) { return function ($scope, $element) {
    //Init
    var args = { element: $element,  scope: $scope }
    $scope.$emit('imgcreated', args);

    //Hide first
    $element.addClass('hidden-until-loaded');

    //Reserve space first
    //var ratio = 0.5//$scope.item.height / $scope.item.width * 100;
    //$element.attr('style', 'padding-bottom: '+ratio+'%;height:0 !important;');

    //Show when loaded
  	$element.bind("load", function (event){
      $scope.$emit('imgloaded', args);
  		if(event.target.complete) $element.removeClass('hidden-until-loaded');
  	});

    //This one is launched from Queue
    $scope.$on('imgload', function(event, args){
      $timeout(function(){
        $scope.file.load = true;
      });
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
    return input[Object.keys(input)[0]]
  } else {
    return '';
  };
}});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
app.filter('keylength', function(){ return function(input){
  if(input){
    return Object.keys(input).length;
  }
}});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Slide */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.directive('slide', ['$rootScope', function ($rootScope) {
  return {
    templateUrl: '/assets/views/slide.html',
    link: function ($scope, $element) {
      //
      $scope.$watch('filenames', function(val){
        $scope.files = (!$scope.filenames) ? [] : $scope.filenames.split(',').map(function(filename){
          return $scope.page.files[filename];
        });
      }, true);
    }
  }
}]);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Slideshow */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.directive('slideshow', ['$rootScope', function ($rootScope) {
  return {
    templateUrl: '/assets/views/slideshow.html',
    link: function ($scope, $element) {
      //From string to array

      $scope.$watch('page', function(val){
        $scope.current = 0;
        $scope.last = ($scope.page) ? $scope.page.content.slides.length-1 : 0;
      }, true);

    }
  }
}]);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ! */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var queue = {};

//Welcome to our factory
app.factory('queue', function($q){
  //Init
  queue.init = function(){
    queue.imgs = [];
    queue.current = 0;
    queue.initiated = $q.defer();
  }
  //Add
  queue.add = function(args){
    queue.initiated.resolve();
    queue.imgs.push(args);
  }
  //Ready
  queue.ready = function(){
    return queue.initiated.promise;
  }
  //Start
  queue.start = function(){
    queue.imgs[0].scope.$emit('imgload', queue.imgs[0]);
  }
  //Next
  queue.next = function(){
    if(queue.imgs[queue.current+1]){
      queue.current++;
      queue.imgs[queue.current].scope.$emit('imgload', queue.imgs[queue.current]);
    }
  }
  //Return self
  return queue;
});
