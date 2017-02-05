angular
  .module('App.HomeController', ['ngRoute', 'ngMaterial', 'App.ArtistFactory'])
  .controller('HomeController', ['$scope', 'ArtistFactory', HomeController])

function HomeController($scope, ArtistFactory) {
  $scope.searchVal = '';
  $scope.featuredArtist = {};
  $scope.relatedArtists = [];
  $scope.showArtist = false;
  $scope.showRelated = false;
  $scope.search = () => {
    ArtistFactory.fetchArtist($scope.searchVal).then((res) => {
      if (res && res.data.artists.items) {
        $scope.showArtist = true;
        const artist = res.data.artists.items[0];
        $scope.featuredArtist = {
            'artistName': artist.name,
            'artistImg': artist.images[0].url,
            'artistId': artist.id
        }
      }
    })
    .then(() => ArtistFactory.fetchRelated($scope.featuredArtist.artistId))
    .then((res) => {
      $scope.showRelated = true;
      $scope.relatedArtists = res.data.artists.map((artist) => {
        return ({
          'artistName': artist.name,
          'artistImg': artist.images[0].url,
          'artistId': artist.id
        })
      })
    })
  }
}
