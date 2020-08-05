# Summary
This simple server-side exercise was done as part of the Node section 'Working with the Express response object'. 

## Assigment
Build an Express server with GET endpoint /apps. By default return the complete list of apps in the array. The endpoint accepts the following optional query parameters:

* sort ('rating' or 'app')
* genres ('Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', Card')

## Example Commands
* http://localhost:8000/apps
* http://localhost:8000/apps?sort=app
* http://localhost:8000/apps?genres=casual&sort=rating