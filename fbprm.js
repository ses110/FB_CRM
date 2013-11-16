var app = angular.module("fbprm", []);

function fbprm($scope) {

	$scope.login = function {
	  Parse.FacebookUtils.logIn("read_mailbox", {
	  success: function(user) {
	    if (!user.existed()) {
	      alert("User signed up and logged in through Facebook!");
	    } else {
	      alert("User logged in through Facebook!");
	    }
	  },
	  error: function(user, error) {
	    alert("User cancelled the Facebook login or did not fully authorize.");
	  }
	  });
	}

	 $scope.readMessages = function () {
	    FB.api('/629564354?fields=id,name,threads,inbox', function(response) {
	      console.log(response.threads);
	      console.log(response.inbox.data);
	    });  
	}

}