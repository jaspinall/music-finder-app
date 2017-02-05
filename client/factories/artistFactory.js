angular
  .module('App.ArtistFactory', [])
  .factory('ArtistFactory', ['$http', ArtistFactory]);

function ArtistFactory($http) {
  return ({
    fetchArtist: (artist) => {
      return (
        $http({
          method: 'GET',
          url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`
        })
      )
    },
    fetchRelated: (id) => {
      return (
        $http({
          method: 'GET',
          url: `https://api.spotify.com/v1/artists/${id}/related-artists`
        })
      )
    },
  })
}
