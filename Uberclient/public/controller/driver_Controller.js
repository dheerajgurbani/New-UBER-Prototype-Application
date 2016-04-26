var app = angular.module('myApp',[]);
app.controller('AppCtrl',function($scope, $http){
	$scope.hide_trips = true;
	$scope.hideProfile = true;
	$scope.showBill=true;
	$scope.showVideoandPicture=true;
	
	$scope.show_bill = function(){
		$scope.showbill = true;
		console.log(" I am in show bill controller");
		//$scope.ridehistory = true;
		$http.get('/show_bill').success(function(response){
			console.log(response);
			$scope.bill = response;
			$scope.hideProfile = true;
		});
	}

	//$scope.ridehistory = false;
	
	
	$scope.ride_history = function(){
		console.log(" I am in ride history controller");
		//$scope.ridehistory = true;
		$http.get('/ride_history').success(function(response){
			$scope.hide_trips=false;
			console.log(response);
			$scope.history = response;
			$scope.hideProfile = true;

		});
	}
	
	
	$scope.show_profile = function(){
		console.log(" I am in show Profile controller");
		$http.get('/show_profile').success(function(response){
			$scope.hide_trips = true;
			console.log(response);
			$scope.hideProfile=false;
			$scope.profile = response;
		});
	}
	
	$scope.updateProfile = function(){
		console.log(" I am in update Profile controller");
		//$scope.ridehistory = true;
		$http.post('/update_profile',
				{d_fname: $scope.profile.d_fname,
				 d_lname: $scope.profile.d_lname,
				 ssn:$scope.profile.ssn,
				 d_id:$scope.profile.d_id,
				 car_number:$scope.profile.car_number,
				 insurance_number:$scope.profile.insurance_number}).success(function(response){
			console.log(response);
			$scope.profile = response;
			$scope.hide_trips = true;
			$scope.hideProfile = false;
		});
	}
	
	$scope.startride = function(){
		console.log(" I am in start ride controller");
		//$scope.ridehistory = true;
		$http.post('/start_ride',
				{r_id: $scope.startride.r_id}).success(function(response){
			console.log(response);
			$scope.startride = response;
			$scope.hide_trips = true;
			$scope.hideProfile = true;
		});
	}
	
	$scope.endride = function(){
		console.log(" I am in end ride controller");
		//$scope.ridehistory = true;
		$http.post('/end_ride',
				{r_id: $scope.endride.r_id}).success(function(response){
			console.log(response);
			$scope.endride = response;
			$scope.hide_trips = true;
			$scope.hideProfile = true;
		});
	}
	
	$scope.showreviewsnratings = function(){
		console.log(" I am in show reviews n ratings controller");
		//$scope.ridehistory = true;
		$http.get('/show_reviewsnratings').success(function(response){
			console.log(response);
			$scope.showreviewsnratings = response;
			$scope.hide_trips = true;
			$scope.hideProfile = true;
		});
	}
	
	$scope.upload_video = function(){
		console.log(" I am in upload Video controller");
		//video_link will be provided by user as input
		$scope.video_link = "abcd";
		$http.post('/upload_video',{video_link: $scope.video_link}).success(function(response){ 
			console.log(response);
			$scope.hide_trips = true;
			$scope.hideProfile = true;
			
		});
	}
	
	$scope.view_video = function(){
		console.log(" I am in upload Video controller");
		//video_link will be provided by user as input
		$http.get('/view_video').success(function(response){ 
			console.log(response);
			$scope.show_video_link = response;
			$scope.hide_trips = true;
			$scope.hideProfile = true;
		});
	}
	

});