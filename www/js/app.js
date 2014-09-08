// AirDelay app
angular.module('airDelayApp', ['ionic', 'firebase', 'airDelayApp.controllers'])

.run(function ($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        navigator.splashscreen.hide()
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl'
      })

      .state('app.airdelays', {
          url: "/airdelays",
          views: {
              'menuContent': {
                  templateUrl: "templates/airdelays.html",
                  controller: 'AirDelaysCtrl'
              }
          }
      })

      .state('app.single', {
          url: "/airdelays/:iata",
          views: {
              'menuContent': {
                  templateUrl: "templates/airdelay.html",
                  controller: 'AirDelayCtrl'
              }
          }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/airdelays');
});

