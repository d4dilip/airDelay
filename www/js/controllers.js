angular.module('airDelayApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  //// Form data for the login modal
  //$scope.loginData = {};

  //// Create the login modal that we will use later
  //$ionicModal.fromTemplateUrl('templates/login.html', {
  //  scope: $scope
  //}).then(function(modal) {
  //  $scope.modal = modal;
  //});

  //// Triggered in the login modal to close it
  //$scope.closeLogin = function() {
  //  $scope.modal.hide();
  //};

  //// Open the login modal
  //$scope.login = function() {
  //  $scope.modal.show();
  //};

  //// Perform the login action when the user submits the login form
  //$scope.doLogin = function() {
  //  console.log('Doing login', $scope.loginData);

  //  // Simulate a login delay. Remove this and replace with your login
  //  // code if using a login system
  //  $timeout(function() {
  //    $scope.closeLogin();
  //  }, 1000);
  //};
})

.controller('AirDelaysCtrl', function ($scope, $http, $timeout, $ionicLoading) {
    $ionicLoading.show({
        template: 'Loading...'
    });

    var _url = 'https://publicdata-airports.firebaseio.com/';
    var _ref =  new Firebase(_url)
   _ref.once('value', function (snap) {
       
        $timeout(function () {
            var myObj = snap.val();
            var parsed = myObj;
            var arr = [];
            for (var x in parsed) {
                if (typeof (parsed[x]) != "string") {
                    arr.push(parsed[x]);
                }
            }
            $scope.airDelaysList = arr;
            window.localStorage.setItem("airdelayList", JSON.stringify(arr));
            $ionicLoading.hide();
        });
        
    });
  
})

.controller('AirDelayCtrl', function ($scope, $stateParams, $ionicLoading) {
    $ionicLoading.show({
        template: 'Loading...'
    });
    var data = JSON.parse(window.localStorage.getItem("airdelayList"));
    var iata = $stateParams.iata;
   
    for(var i=0;i<data.length;i++)
    {
        if (iata == data[i].IATA) {
            $scope.airDelay = data[i];
            break;
        }
    }
    $ionicLoading.hide();
});

