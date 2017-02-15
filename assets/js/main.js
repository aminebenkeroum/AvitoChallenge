// Intialise the Angular App
var app = angular.module('vimeoApp', []);
// Get JSON Feed from feed.js
var videos = feed.data;

app.controller('FeedController', function($scope, $filter) {
    
    var vimeoApp = this;
    const MAX_PAD = 50;
    // Add Videos to scope
    $scope.videos = videos;	
    $scope.tendingUsers = false;
    $scope.word = "";
    $scope.pad = 10;
    $scope.availablePadding = [10,25,50];
    $scope.next = true;
    $scope.currentPage = 0;
    $scope.itemsPerPage = 10;
    $scope.doNext = function(){

      if($scope.pad === 10 && $scope.currentPage === 3)
        $scope.next = false;
      if($scope.pad == 25 && $scope.currentPage === 3)
        $scope.next = false;
      

      $scope.currentPage += 1;
    }
    
});

// Shot description filter 
app.filter('ellipsis', ['$sce', function ($sce) {
    return function (text, length) {
        if (text.length > length) {
            return $sce.trustAsHtml(text.substr(0, length) + '...');
        }
        return $sce.trustAsHtml(text);
    }
}]);


// Videos from users that have more than 10 likes
app.filter('mainFilter', function () {
  return function (videos, tendingUsers) {
     filtered = [];
     angular.forEach(videos, function(video){
   		if(!tendingUsers)
   			filtered.push(video);
   		else{
   			if(parseInt(video.user.metadata.connections.likes.total) > 10) filtered.push(video);
   		}
     });
     return filtered;
  }
});

// Filter videos by keyword matching in the description attribute
app.filter('search', function(){
  return function(videos, word){
    matchs = [];
    word = word.toLowerCase();
    angular.forEach(videos, function(video) {
      if( video.description  && video.description.toLowerCase().indexOf(word) >= 0 )matchs.push(video);
    });
    return matchs;
  }
});

// Slice videos by "start" offset for Pagination
app.filter('startFrom', function() {
    return function(videos, start) {
        start = +start;
        return videos.slice(start);
    }
});