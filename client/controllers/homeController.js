angular
  .module('App.HomeController', ['ngRoute', 'ngMaterial', 'App.ArtistFactory'])
  .controller('HomeController', ['$scope', 'ArtistFactory', HomeController])


function HomeController($scope, ArtistFactory) {
  $scope.name = 'hello';
  $scope.searchVal = '';
  $scope.search = () => {
    ArtistFactory.fetch($scope.searchVal).then((res) => console.log(res));
  }
}
