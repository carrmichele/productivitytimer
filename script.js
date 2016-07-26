var app = angular.module('StylishTimer', []);

app.controller('TimerControl', function($scope, $interval) {
	
	
$scope.sessionLength = 30;
	 $scope.breakLength = 5;
  $scope.timeLeft = $scope.sessionLength;
  $scope.currentTotal;
	
	var runTimer = false;
  var secs = 60 * $scope.timeLeft;
  $scope.originalTime = $scope.sessionLength;
  
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
	
	$scope.sessionChangeMinus = function() {
		var str = $scope.sessionLength;
	
	  if ($scope.sessionLength === 0) {
			str = 0;
		} else if ($scope.sessionLength !== '0') {
			str = str -1;
		}
		
		$scope.sessionLength = str;	
	  $scope.timeLeft = $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
	}
	

	
		$scope.sessionChangePlus= function() {
		var str = $scope.sessionLength;
	if ($scope.sessionLength < 1000) {
			str = str + 1;
		}
		
		$scope.sessionLength = str;	
			  $scope.timeLeft = $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
	}
		
			  $scope.breakLengthChange = function(time) {
    if (!runTimer){
      $scope.breakLength += time;
      if ($scope.breakLength < 1) {
        $scope.breakLength = 0;
      }
      if ($scope.alert === 'Break!') {
        $scope.timeLeft = $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
      }
    }}
  
				
				$scope.timer = function() {
					if(!runTimer) {
						if($scope.currentName === "Session"){
							$scope.currentLength = $scope.sessionLength;
						} else {
							$scope.currentLength = $scope.breakLength;
						} 
						updateTimer();
						runTimer = $interval(updateTimer, 1000);
					} else {
						$interval.cancel(runTimer);
						runTimer = false;
					}
				}
			
				function updateTimer() {
					secs -= 1;
					if(secs < 0) {
						 $scope.alert = "Time is Up!";
						
						if ($scope.alert === 'Break!') {
							$scope.alert = '';
							$scope.currentLength = $scope.sessionLength;
							$scope.timeLeft = 60 * $scope.sessionLength;
							$scope.originalTime = $scope.sessionLength;
							secs = 60 * $scope.sessionLength;
						} else {
							$scope.alert = 'Break!';
							$scope.currentLength = $scope.breakLength;
							$scope.timeLeft = 60 * $scope.breakLength;
							$scope.originalTIme = $scope.breakLength;
							secs = 60 * $scope.breakLength;
						}
					} else {
				
							$scope.timeLeft = secondsToHms(secs);
							
							var denom = 60 * $scope.originalTime;
							var perc = Math.abs((secs / denom) * 100 - 100);
							$scope.fillHeight = perc + '%';
						}
					}
	
				});
				