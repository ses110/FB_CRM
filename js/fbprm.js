var app = angular.module("fbprm", []);

function fbprm($scope) {

console.log('variables Initializing')
	//Initializing variables
	$scope.user = Parse.User.current();
	$scope.threads = [];

	//preset threads
	//$scope.threads = [
	//	{snippet: "snippet1", participants: "bob1", stage: "new", thread: "fskfjahf", id: "davefontenot", proPic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1117432_1725380113_505551893_q.jpg"},
	//	{snippet: "snippet2", participants: "bob2", stage: "new", thread: "fskfjahf", id: "davefontenot", proPic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1117432_1725380113_505551893_q.jpg"}
	//]

	$scope.addThread = function (thread) {
		$scope.threads.push(thread);
	}	

	//$scope.addThread({snippet: "blah", participants: "blahblah"});

	$scope.updatePics = function() {
		for (i=0; i < $scope.threads.length; i++) {
			$scope.threads[i].proPic = $scope.getProfilePic($scope.threads[i].id);
		}
		//$scope.threads[0].proPic = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1116314_629564354_324251643_q.jpg";
	}

	console.log($scope.threads);

	//Preset values
	$scope.name = ["Laura Ranola"];
	$scope.snippet = ["Hi, I have a problem with the preorder button"];

	console.log('variables Initialized')

	$scope.grabThreads = function () {
        var Thread = Parse.Object.extend("Threads");
        var query = new Parse.Query(Thread);
        //Find all posts by the current user
        query.equalTo("user", $scope.user);
        query.limit('15');
        query.find({
          success: function(usersThreads) {
            for (i = 0; i < usersThreads.length; i++) {
            	$scope.addThread(usersThreads[i]);
            	console.log(usersThreads[i].get('snippet'));
            	console.log(usersThreads[i].get('participants').data[1].name);
            	//console.log(usersThreads[i]);
            }
            $scope.updateThreads();
            //usersThreads;
            //console.log('loaded threads');
            //console.log($scope.threads);
          }
        });
	}

	$scope.updateThreads = function () {
		console.log('updated')
		//$scope.grabThreads();
		//console.log("can push them onto array here");
		//console.log($scope.threads);
		//for (i=0; i < 3; i++) {
			//console.log($scope.threads[i]);
			//console.log($scope.getSnippetForThread($scope.threads[i]));
			//$scope.threads.push($scope.threads[i]);
			//$scope.addThread({snippet: "snippet3", participants: "bob3", stage: "new", thread: "fskfjahf", id: "davefontenot", proPic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1117432_1725380113_505551893_q.jpg"})
		//}
	}

	$scope.getThreadAtIndex = function (index) {
        //saving object with threads to parse
        return $scope.threads[index];
    }

    $scope.getAttributeForThreadAtIndex = function (attr, index) {
    	//first get that thread, then find attribute...might have to do some switch cases
    	console.log($scope.getThreadAtIndex(index))
    }

    $scope.getSnippetForThread = function (thread) {
    	return thread.get('snippet');
    }

    //loads threads into $scope.threads
    $scope.grabThreads();
    console.log('loading threads');

    //Get snippet for threadAtIndex n = 9
    //console.log($scope.getSnippetForThread($scope.getThreadAtIndex($scopes.threads, 9)));

	$scope.login = function () {
		console.log('blah');
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
    	console.log('blah');
          FB.api('/629564354?fields=id,name,threads,inbox', function(response) {
            console.log(response.threads);
            console.log(response.inbox.data);
            var threadsAvailable;

            //saving object with threads to parse


            // Save threads one by one
            for (i=0; i < response.threads.data.length; i++) {

           	  //Grab and Set profile pic -- doing this elsewhere

              //Initialize user thread object
              var Thread = Parse.Object.extend("Threads");
              var thread = new Thread();  

              //set data
              thread.set("user", $scope.user);
              //console.log($scope.getProfilePic(_.toArray(response.threads.data[i].participants.data)[1].id));
              //thread.set("proPic", $scope.getProfilePic(response.threads.data[i].participants.data.id));
              thread.set("thread", response.threads.data[i]);
              thread.set("participants", response.threads.data[i].participants);
              thread.set("snippet", response.threads.data[i].snippet);
              thread.set("updatedTime", response.threads.data[i].updatedTime);
              thread.set("stage", "new");
              //threads.set("body", "This is some great content.");
              thread.save(null, {
                success: function(thread) {
                  console.log('successful saved thread');
                  // Find all posts by the current user
                  //var query = new Parse.Query(Thread);
                  //query.equalTo("user", user);
                  //query.find({
                  //  success: function(usersThreads) {
                  //    threadsAvailable = usersThreads;
                  //    // userPosts contains all of the posts by the current user.
                  //  }
                  //});
                }
              });              
            }
          });  
       }

       //call to fill in profile pics with fbIDs
       $scope.getProfilePic = function (fbID) {
       	console.log('trying to get pic');
       	var proPic = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1117432_1725380113_505551893_q.jpg";
           	FB.api('/' + fbID + '?fields=id,name,picture', function(response) {
           		console.log(response.picture.data.url);
           		return proPic = response.picture.data.url;
           	});
        //return proPic;
       }

       $scope.proPict = function () {
       		//console.log($scope.getProfilePic('davefontenot'));
       		return "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1117432_1725380113_505551893_q.jpg";
       }


       $scope.filterByStage = function (stage) {
          //alert(stage);
          var Thread = Parse.Object.extend("Threads");
          var query = new Parse.Query(Thread);
       		console.log('showing only threads with this stage');
          $scope.threads = [];
          query.equalTo("stage", stage);
          query.limit('15');
          query.find({
            success: function(usersThreads) {
              for (i = 0; i < usersThreads.length; i++) {
                $scope.addThread(usersThreads[i]);
                console.log(usersThreads[i].get('snippet'));
                console.log(usersThreads[i].get('participants').data[1].name);
                //console.log(usersThreads[i]);
              }
              $scope.updateThreads();
              //usersThreads;
              //console.log('loaded threads');
              //console.log($scope.threads);
            }
        });
       }

       $scope.setInitStageValues = function () {
        $scope.newb = true;

       $scope.dev = true;

       $scope.resolved = true;

       $scope.notify = true;
       }


       $scope.filterByStageNew = function () {
         $scope.setInitStageValues()
        //alert('washjhfahfk');
          $scope.filterByStage('new');
          $scope.updateThreads();
          $scope.newb = false;
       }

        $scope.filterByStageDev = function () {
           $scope.setInitStageValues()
          $scope.filterByStage('dev');
          $scope.updateThreads();
          $scope.dev = false;
       }

        $scope.filterByStageResolved = function () {
           $scope.setInitStageValues()
          $scope.filterByStage('resolved');
          $scope.updateThreads();
          $scope.resolved = false;
       }

      $scope.filterByStageNotify = function () {
         $scope.setInitStageValues()
          $scope.filterByStage('notify');
          $scope.updateThreads();
          $scope.notify = false;
       }

       $scope.getNextThreads = function (threadNumber) {
       		//query.skip(25*threadNumber); -- infinite scroll?
       		console.log('getting next page of threads');
       }

       $scope.changeStage = function (thread, stage) {
        var Thread = Parse.Object.extend("Threads");
        var th = new Thread();
        th.id = thread.id;
        //console.log(thread.id);

        th.set("stage", stage);
        th.save(null, {
          success: function(point) {
            console.log(point);
            alert('success');
            // Saved successfully.
          },
          error: function(point, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
          }
        });
       }

       $scope.stageNew = function (thread) {
        var Thread = Parse.Object.extend("Threads");
        var th = new Thread();
        th.id = th.get('id');
       }

       $scope.stageDev = function (thread) {
        var Thread = Parse.Object.extend("Threads");
        var th = new Thread();
        th.id = th.get('id'); 
       }

       $scope.stageResolved = function (thread) {
        var Thread = Parse.Object.extend("Threads");
        var th = new Thread();
        th.id = th.get('id'); 
       }

       $scope.stageNotify = function (thread) {
        var Thread = Parse.Object.extend("Threads");
        var th = new Thread();
        th.id = th.get('id'); 

       }




       //$scope.getProfilePic('yefim323');


	   //$scope.readThread(9);

       //we should have a function that grabs all the threads and stores them in a $scope variable
       //we should then have a function that lets you grab a particular thread
       //we should then have a function that lets you grab a specific attribute of a particular thread
       //the last function should use the previous one and that one should depend on the previous one

}