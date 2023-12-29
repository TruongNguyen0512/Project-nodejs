require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const newUser = new User({ username, password })
		await newUser.save()

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login',async(req,res) =>{
	const{username,password} = req.body  
	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })
	    try {
			// Check for existing user 
			const user = await User.findOne({username})
			if (!user)
			return res.status(400).json({success :false ,message :'incorrect username '})
		//  Username found
		//const passwordValid = await bcrypt.compare(password, user.password);
        if(password!= user.password )  {
	    return res.status(400).json({success:false , message :'incorrect password'})
		}
		// Return token
		const accessToken = jwt.sign(
			{ userId: User._id },
			process.env.ACCESS_TOKEN_SECRET 
		)

		res.json({
			success: true,
			message: 'Login  successfully',
			accessToken
		})
		} catch (error) {
			console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
		}	
} )
module.exports = router