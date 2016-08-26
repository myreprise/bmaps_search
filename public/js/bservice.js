angular.module('bservice', [])
	.factory('bservice', function($rootScope, $http){


		//Initialize variables
		var baiduMapService = {};
		baiduMapService.clickLat = 0;
		baiduMapService.clickLng = 0;

		//array of locations from API call
		var locations = [];

		//Initialize starting coordinates
		var selectedLat = 34.3416;
		var selectedLng = 108.9398;

		//Functions
		//----------------------------------

		//Refresh the map call

		baiduMapService.refresh = function(longitude, latitude, filterResults){

			//clear the holding array of locations
			locations = [];

			//reset the lat and longitude
			selectedLat = latitude;
			selectedLng = longitude;

			//if filtered in the refresh()
			if(filterResults){

				locations = convertToMapPoints(filterResults);
				
				//Then initialize the map
				initialize(longitude, latitude, true);
			}
			else {
				initialize(longitude, latitude, false);
			}
		} //end of the baiduMapService

		//PRIVATE INNER FUNCTIONS of MODULE

		//Convert JSON into map points
		var convertToMapPoints = function(response){
			//clear locations
			var locations = [];

			//loop through the JSON
			for(var i = 0; i < response.length; i++){

				var respondent = response[i];

				//create a popup window for each record

				//push 
				locations.push(new Location(respondent.location[0], respondent.location[1]))

				//
			} //end of the for loop

			return locations
		} //end of convertToMapPoints

		//constructor for a location
		var Location = function(longitude, latitude){
			this.longitude = longitude;
			this.latitude = latitude;
		};

		//Initialize the map
		var initialize = function(longitude, latitude, filter){


			//if map has not been created...
			if(!map){

				var map = new BMap.Map('map', {
					mapType: BMAP_SATELLITE_MAP
				});

				map.centerAndZoom(new BMap.Point(longitude,latitude), 14);
				map.addControl(new BMap.NavigationControl()); 

				//map.enableScrollWheelZoom();
				map.enableContinuousZoom();
			} // end of if map not created

			//if a filter was used

			//loop through each location
			locations.forEach(function(item){
				var marker = new BMap.Marker(new BMap.Point(item.longitude, item.latitude));
				map.addOverlay(marker);
			}); // end of the forEach call


		} //end of initialize function

		EventWrapper.addDomListener(window, 'load', baiduMapService.refresh(selectedLng, selectedLat));

		return baiduMapService;


	}); // end of the factory module