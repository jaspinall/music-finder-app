angular
  .module('App.ArtistFactory', [])
  .factory('ArtistFactory', ['$http', ArtistFactory]);

function ArtistFactory($http) {
  const featuredArtist = {};
  const relatedArtists = [];
  return({
    getArtist: () => {
      return featuredArtist;
    },
    setArtist: (artist) => {
      featuredArtist.artistName = artist.artistName;
      featuredArtist.artistImg = artist.artistImg;
      featuredArtist.artistId = artist.artistId;
    },
    getRelatedArtists: () => {
      return relatedArtists;
    },
    setRelatedArtists: (array) => {
      console.log('setting artists')
      array.forEach((artist) => {
        relatedArtists.push(artist)
      });
    },
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
    fetchWikipedia: (searchTerm) => {
      return (
        $http({
          method: 'GET',
          url: `http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${searchTerm}`,
        })
      )
    }
  });
}
