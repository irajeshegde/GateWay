var express 				= require('express'),
	mongoose 				= require('mongoose'),
	bodyParser 				= require('body-parser'),
	passport 				= require('passport'),
	session 				= require('express-session'),
	User					= require('./models/users'),
	Channel					= require('./models/channels'),
	LocalStrategy 			= require('passport-local'),
	methodOverride 			= require('method-override'),
	passportLocalMongoose 	= require('passport-local-mongoose'),
	expressSanitizer 		= require('express-sanitizer');;

mongoose.connect("mongodb://localhost/gate_way");
var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); //anytime using a form and posting request
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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


// //CREATE DATABASE
// Channel.create({
// 	title: "Analog distance",
// 	body: "Moisture and water level",
// 	Field1: "Moist",
// 	value1: 20.0,
// 	Field2: "Water",
// 	value2: 6.5,
// });



//HOME
app.get("/", function(req, res){
	res.render("home");
});

//REGISTER
app.get("/register", function(req, res){
	res.render("register");
});


//SECRET or INDEX page
app.get("/channel", isLoggedIn , function(req, res){
	Channel.find({},function(err, channel){
		if (err) {
			console.log(err);
		} else {
			res.render("channel", {channel:channel});
		}
	});
});


//NEW ROUTE 
app.get("/channel/new", isLoggedIn ,function(req, res){
	res.render("new");
});

//CREATE ROUTE
app.post("/channel", isLoggedIn ,function(req, res){
	//create
	req.body.channel.body = req.sanitize(req.body.channel.body);
	Channel.create(req.body.channel, function(err, newcChannel){
		if (err) {
			res.render("new");
		} else {
			res.redirect("/channel")
		}
	});
});

//SHOW ROUTE
app.get("/channel/:id", isLoggedIn ,function(req, res){
	Channel.findById(req.params.id,function(err, foundPost){
		if (err) {
			console.log(err);
		} else {
			res.render("show", {post:foundPost});
		}
	});
});


//EDIT ROUTE
app.get("/channel/:id/edit", isLoggedIn ,function(req, res){
	Channel.findById(req.params.id,function(err, foundPost){
		if (err) {
			req.render("/channel");
		} else {
			res.render("edit", {post:foundPost});
		}
	});
});

//UPDATE ROUTE
app.put("/channel/:id", isLoggedIn ,function(req, res){
	//Channel.findByIdAndUpdate(id , new data, callback)
	req.body.channel.body = req.sanitize(req.body.channel.body);
	Channel.findByIdAndUpdate(req.params.id, req.body.channel, function(err, updatePost){
		if (err) {
			res.redirect("/channel");
		} else {
			res.redirect("/channel/"+req.params.id);	
		}
	});
});

//DELETE ROUTE
app.delete("/channel/:id", isLoggedIn ,function(req, res){
	//destroy
	Channel.findByIdAndDelete(req.params.id, function(err){
		if (err) {
			res.redirect("/channel");
		} else {
			res.redirect("/channel");
		}
	});
	//redirect to homepage
});

//SHOW JSON RESPONSE
app.get("/channel/api/:id", isLoggedIn ,function(req, res){
	Channel.findById(req.params.id,function(err, foundPost){
		if (err) {
			console.log(err);
		} else {
			res.end(JSON.stringify(foundPost));
		}
	});
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
			res.redirect("/channel");
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
	successRedirect : "/channel",
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