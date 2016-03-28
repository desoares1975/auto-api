# lazy-api
Small REST API with db simulation for practice purpose

The genaral idea is to use GET, POST, PUT and DELETE HTTP verbs to access a non secure route to studia frontend tecnologies abstracting the backend.
If you post on any route it will create the routo and store the data automatically
E.g. http://localhost:1000/user will try to get data form user, creating the data and returning an empty array
a post on the same route will try to parse que body and save an user object in an JSON
