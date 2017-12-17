# Postgres Sequelize Passport Exercise

1. Create a posts model
	* You can mirror the profile model
	* Just remember to remove the unique constraint on the user id, as many posts are allowed for a user, only one profile is allowed for a user.
2. Create a post route in routes.js to manually create posts through postman
	* make sure to include ```userID``` to create posts for that user
3. In the ```/profile/:id``` route in routes.js, you will see some commented out code
	* Make the ```GET``` work for the Post model in that route so that the messages for the posts are added to an array, and then that array added to the object which is sent to the html creator
	* The posts array should merely look like this: ```['message one', 'message two']``` with just the messages and indexes
4. In the html creator, i have set up a method which is going to be passed into the main string function. 
	* You will loop through the posts, and have them append to a list
	* Format whatever way you want
5. In the end, the users posts will be there when the user logs in