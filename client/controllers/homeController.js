angular
  .module('App.HomeController', ['ngRoute', 'ngMaterial', 'App.ArtistFactory'])
  .controller('HomeController', ['$scope', 'ArtistFactory', HomeController])

function HomeController($scope, ArtistFactory) {
  $scope.searchVal = '';
  $scope.featuredArtist = '';
  $scope.relatedArtists = '';
  $scope.showArtist = false;
  $scope.showRelated = false;
  $scope.search = () => {
    ArtistFactory.fetchArtist($scope.searchVal).then((res) => {
      if (res && res.data.artists.items.length) {
        $scope.showArtist = true;
        const artist = res.data.artists.items[0];
        ArtistFactory.setArtist({
            'artistName': artist.name,
            'artistImg': artist.images[0].url,
            'artistId': artist.id
        })
        $scope.featuredArtist = ArtistFactory.getArtist();
      }
    })
    .then(() => ArtistFactory.fetchRelated($scope.featuredArtist.artistId))
    .then((res) => {
      $scope.showRelated = true;
      ArtistFactory.setRelatedArtists(res.data.artists.map((artist) => {
        return ({
          'artistName': artist.name,
          'artistImg': artist.images[0].url,
          'artistId': artist.id
        })
      }));
      $scope.relatedArtists = ArtistFactory.getRelatedArtists();
    })
    .then(() => ArtistFactory.fetchWikipedia($scope.featuredArtist.artistName))
    .then((res) => console.log(res))
  }
}
