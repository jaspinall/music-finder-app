const app = angular
  .module('myApp', [
    'ngRoute',
    'ngMaterial',
    'App.HomeController',
    'App.ArtistFactory'
  ]);

const configFunction = ($routeProvider) => {

  $routeProvider
    .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    })

}

app.config(configFunction);
