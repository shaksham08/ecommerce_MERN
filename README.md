# ecommerce_MERN
<h3>An Ecomerce Web app built using MERN STACK</h3>

<h1>Tool Used:</h1>

1. robo3T - https://robomongo.org/
2. Node(version: 12.10.0) :- https://nodejs.org/en/
3. MONGO DB(Community Server version 4.2) :-https://www.mongodb.com/

<h1>Server Request codes</h1>

These are some of the codes which we recieve from the server side , which help us to identify the cause of the error.

1.  **200 OK** :boom:
2.  300 Multiple choices
3.  301 Moved Permanentaly
4.  302 Found
5.  304 Not Modified
6.  307 Temporary Redirect
7.  400 Bad Request
8.  **401 Unauthorized** :boom:
9.  403 Forbidden
10. 404 Not Found
11. 410 Gone
12. **500 Inernal Server Error** :boom:
13. Not implemented
14. 503 Server Unavailable
15. 550 Permission Denied

<h3>Designing the architecture using mind mapping on coogle(https://coggle.it)</h3>

<h3>1. Backend:</h3>

![alt text](https://github.com/shaksham08/ecommerce_MERN/blob/master/backend.jpg "Backend")

Backend Test :

Setup : 

1. Express(https://expressjs.com/)
2. Nodemon(https://nodemon.io/)
3. Mongoose(https://mongoosejs.com/)
4. UUID 

References :- 
Here the UUID gives us the salt id and using crypto(builtin tool in node we produce the hased value.
Here we also make use of virtuals from mongoose -: 
Virtuals:-https://mongoosejs.com/docs/tutorials/virtuals.html#your-first-virtual
UUID - https://www.npmjs.com/package/uuid
salt - https://en.wikipedia.org/wiki/Salt_(cryptography)
crypto:- https://nodejs.org/api/crypto.html








