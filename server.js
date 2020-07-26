const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors());

const database={
	users:[
		{
			id: '123',
			name: 'Aman',
			email: 'sahu@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'sahu',
			email: 'aman@gmail.com',
			password: 'banana',
			entries: 0,
			joined: new Date()
		},
	]
}

app.get('/',(req,res)=>{
	res.json(database.users);
})

app.post('/signin',(req,res)=>{
	 bcrypt.compare("fanny","$2a$10$7UUU2rX.3idLcF5LH/qpxeUVQ3SRbXkEL75mP3FjeTEqHY2wLbeRq", function(err, res) {
    console.log(res);
	});
	bcrypt.compare("veggies","$2a$10$7UUU2rX.3idLcF5LH/qpxeUVQ3SRbXkEL75mP3FjeTEqHY2wLbeRq", function(err, res) {
    console.log(res);
	});
	if(req.body.email===database.users[0].email && req.body.password===database.users[0].password)
		res.json(database.users[0]);
	else
		res.status(400).json("error logging data");
})

app.post('/register',(req,res)=>{
	const{email,name,password}=req.body; //de-structuring
	database.users.push(
		{
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		}
		)
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
	const{id}=req.params;
	let found=false;
	database.users.forEach(user=>{
		if(user.id===id)
		{
			found=true;
			res.json(user);
		}
	})
	if(!found)
		res.json("user not found");
})

app.put('/image',(req,res)=>{
	const{id}=req.body;
	let found=false;
	database.users.forEach(user=>{
		if(user.id===id)
		{
			found=true;
			user.entries++;
			res.json(user.entries);
		}
	})
	if(!found)
		res.json("user not found");
})

app.listen(3001,()=>{
	console.log("App is running at port 3001");
})