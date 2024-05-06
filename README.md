<div>
<h1>
Movies API
</h1>
<h2>
Description
</h2>
<p>
This is a RESTful API for managing movies , user account ( Register - Login - explore Profile) and watch lists. The API allows users to add, remove, and view movies in their watch  lists.
</p>
<h2>
Features
</h2>
<ul>
<li>
User authentication and authorization
</li>
<li>
Movie management (add, remove, view)
</li>
<li>
Watchlist management (add, remove, view)
</li>
<li>
Review management (add, remove, view) with comment and rate
</li>
</ul>
<h2>
Tech Stack
</h2>

<ul>
<li>
Node.js
</li>
<li>
Express.js
</li>
<li>
MongoDB
</li>
<li>
Mongoose
</li>
<li>
JavaScript
</li>
</ul>
<h2>
Getting Started
</h2>
<h3>
Installation
</h3>

<ul>
<li>
Clone the repository: git clone https://github.com/.git
</li>
<li>
Install dependencies : `npm install`
</li>
<li>
Start server : `npm start` 
</li>
</ul>
<h2>API Endpoint</h2>

<ul>
<li>
Method (post)
`/api/watch/add`: to add movie to user watchlist
</li>
<li>
Method (get)
`/api/watch/watchlist`: to explorer watchlist
</li>
<li>
Method (delete)
`/api/watch/delete/:id`: to remove movie from user watchlist
</li>
<li>
Method (post)
`/api/auth/reg`: Login existing user
</li>
<li>
Method (post)
`/api/auth/login`: Explorer user profile
</li>
<li>
Method (get)
`/api/auth/me`: Explorer user profile
</li>
<li>
Method is (post)
`/api/movie/:id/rev`: Add a review that content comment and rate for existing user 
</li>
<li>
Method is (get)
`/api/movie/:id/rev`: Get all reviews of this movie by id
</li>
<li>
Method (delete)
`/api/movie/:id/rev`: Removing review 
</li>
<li>
Method (post)
`/api/movie`: Add movie 
</li>
<li>
Method (put)
`/api/movie/:id`: Edit existing movie 
</li>
<li>
Method (delete)
`/api/movie/:id`: remove existing movie 
</li>
<li>
Method (get)
`/api/movie/:id`: Find movie
</li>
<li>
Method (get)
`/api/movie/all`: Get list of all movie 
</li>
</ul>

<h2>
Contributing
</h2>

<p>
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.
</p>
<h2>Author :</h2>
<strong>Name:</strong> Ahmed Rabei</br>
<strong>Email:</strong> ahmrabia@gmail.com </br>

<p>Feel free to customize this template to fit your project's needs. Good luck with your project, and I hope this helps</p>
</div>
