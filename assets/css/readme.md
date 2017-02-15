# Frontend developer challenge
This is a 6 hours proof of concept buit using [AngularJS](https://docs.angularjs.org/ "Title") to apply to the open front-end developer position at [Avito.ma](http://avito.ma).
AngularJS App : Vimeo's top videos listing, with 3 main filters :
# Fitlers used in the app
## Search by keyword
Provide a simple search through the json feed videos by keyword in the description, see code below :
```javascript
app.filter('search', function(){
  return function(videos, word){
    matchs = [];
    word = word.toLowerCase();
    angular.forEach(videos, function(video) {
      if( video.description  && video.description.toLowerCase().indexOf(word) >= 0 )matchs.push(video);
    });
    return matchs;
 }
 ```
## Filter by videos from users with more than 10 likes
Checkbox where the user can filter or not the videos feed from users with more than 10 likes, see code below :
```javascript
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
```
## Pagination in "Next" direction
Provide the ability to the user to see the next elements of 10 items offset
```javascript
app.filter('startFrom', function() {
    return function(videos, start) {
        start = +start;
        return videos.slice(start);
    }
});
```
**"start" is calculated in the view from 2 scope's attributes : currentPage, itemPerPage**

## Show items by length 10, 25, 50
Used a simple "limitTo" built-in filter directly on the ng-repeat directive
```html
<div class="video list-group-item" ng-repeat="video in videos |  mainFilter: tendingUsers | search: word | startFrom:currentPage*itemsPerPage | limitTo: pad">
```

# Why AngularJS ?
### Declarative views
In this case, we must get through a lot of DOM injections procedurally and directly in Javascript, AngularJS made it easy, using HTML, a declarative language, which is more intuitive and less convoluted.
### Data models
Data models in Angular are plain old JavaScript objects and don’t require extraneous getter and setter functions. You can add and change properties directly on it and loop over objects and arrays at will. The code will look much cleaner and more intuitive, the way mother nature intended.
### Flexibility with filters
Why keep reinventing the wheel ?
### Because it's AWESOME.
## Other libraries :
* Angular-sanitize (to clean up videos description)
* Twitter Bootstrap
* Font Awesome
