var express 				= require('express'),
	mongoose 				= require('mongoose'),
	bodyParser 				= require('body-parser'),
	passport 				= require('passport'),
	session 				= require('express-session'),
	User					= require('./models/users'),
	LocalStrategy 			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/auth_demo");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); //anytime using a form and posting request

//methods - reading session, taking data from session and encode, decode and put back
passport.use(new LocalStrategy(User.authenticate())); //passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//express session
app.use(session({
	//this is used to decode
	secret : "Be the best version of you do the best you can",
	resave: false,
	saveUninitialized: false,
}));

//setting passport - THIS SHOULD BE AFTER EXPRESSION !!!!!
app.use(passport.initialize());
app.use(passport.session());


//HOME
app.get("/", function(req, res){
	res.render("home");
});

//SECRET page
app.get("/secret", isLoggedIn , function(req, res){
	res.render("secret");
});

//REGISTER
app.get("/register", function(req, res){
	res.render("register");
});

//handeling registration
app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.redirect("/");
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});

//LOGIN ROUTES
//Login
app.get("/login", function(req, res){
	res.render("login");
});
//login logic
app.post("/login", passport.authenticate("local",{
	//middlewhere - which runs before callback
	successRedirect : "/secret",
	failureRedirect : "/login"
}),function(req, res){
	
});

//LOGOUT
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

//middlewhere
function isLoggedIn(req, res, next){
	console.log(req.isAuthenticated());
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

// Tell express to listen for requests (start server)
app.listen(3000, function(){
	console.log('auth server started...')
});