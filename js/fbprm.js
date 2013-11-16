var app = angular.module("fbprm", []);

function fbprm($scope) {

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
            var user = Parse.User.current();


            // Save threads one by one
            for (i=0; i < response.threads.data.length; i++) {
              //Initialize user thread object
              var Thread = Parse.Object.extend("Threads");
              var thread = new Thread();  
              thread.set("user", user);
              thread.set("thread", response.threads.data[i]);
              thread.set("participants", response.threads.data[i].participants);
              thread.set("snippet", response.threads.data[i].snippet);
              thread.set("updatedTime", response.threads.data[i].updatedTime);
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

       $scope.readThread = function (atIndex) {
            //saving object with threads to parse
            var user = Parse.User.current();
            var Thread = Parse.Object.extend("Threads");
            //Find all posts by the current user
            var query = new Parse.Query(Thread);
            query.equalTo("user", user);
            query.find({
              success: function(usersThreads) {
                //threadsAvailable = usersThreads;
                // userPosts contains all of the posts by the current user.
                console.log(usersThreads[atIndex]);
                console.log(usersThreads[atIndex].get('snippet'))
                return usersThreads[atIndex].get('snippet');
              }
            });
       }

       $scope.readThread(9);

       //we should have a function that grabs all the threads and stores them in a $scope variable
       //we should then have a function that lets you grab a particular thread
       //we should then have a function that lets you grab a specific attribute of a particular thread
       //the last function should use the previous one and that one should depend on the previous one

}