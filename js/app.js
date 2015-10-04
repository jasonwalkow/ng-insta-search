angular.module('instagramApp', ['ngAnimate'])
	.controller('MyCtrl', ['$scope', '$q', '$http', 
		function($scope, $q, $http) {

			function emptyImageData() {
				$scope.imageData = {
					imageUrl: [],
					instagramUrl: []
				};
				return $scope.imageData;
			}

			$scope.loadMsg = false;
			$scope.errorMsg = false;

			function wait() {
			    var defer = $q.defer();
			    // Simulating doing some asynchronous operation...
			    setTimeout(function(){
			      defer.resolve();
			    }, 2000);
			    return defer.promise;
			}

			function parseCallback(result) {
				$scope.loadMsg = false;
				for(var i=0; i<20; i++) {
         			$scope.imageData.imageUrl.push(result.data[i].images.low_resolution.url);
         			$scope.imageData.instagramUrl.push(result.data[i].link);
         		}
			}

			$scope.searchInstagram = function(searchText) {
				emptyImageData();
				$scope.data.search_text = null;
				$scope.data.searchValue = searchText || null;
				$scope.loadMsg = true;
	       		var url = "https://api.instagram.com/v1/tags/"+ searchText +"/media/recent";
	       		var request = {
	         		callback: "JSON_CALLBACK",
	         		client_id: "8a4163b486b0469da5e8e55039e2a14c"
	       		};

	         	$http({
	         		method: 'JSONP',
	         		url: url,
	         		params: request
	         	})
	         	.success(function(result) {
	         		wait().then(parseCallback(result));	         		
	         	})
	         	.error(function(){
	         		$scope.loadMsg = false;
	         		$scope.successMsg = false;
	         		$scope.errorMsg = true;
	         	});

	         	};
	         }
		]);