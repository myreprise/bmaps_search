var queryController = angular.module('queryController', ['bservice']);

queryController.controller('queryController', function($scope, $log, $http, $rootScope, bservice){

	//initialize variables
	$scope.formData = {};
	var queryBody = {};
	var startLat = 34.3416;
	var startLong = 108.9398;

	//Functions


	//Query paraments incorporated into a JSON queryBody
	$scope.queryLocations = function(){
		//Assemble queryBody
		queryBody = {
			residence: $scope.formData.residence,
			block: $scope.formData.block
		};

		//Post the queryBody to the /query POST route to retrieve filtered results
		$http.post('/query', queryBody)
			.success(function(queryResults){
				console.log(queryResults);

				//Pass the filtered results to the gMaps service and refresh the map
				bservice.refresh(startLong, startLat, queryResults);

				//count the number of records retrieved.
				$scope.queryCount = queryResults.length;

				$scope.projectList = queryResults
			})
			.error(function(queryResults){
				console.log('Error ' + queryResults);
			})
	};

});