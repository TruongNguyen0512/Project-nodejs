const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://dannynguyen:123@mern-learnit.k9b1hgn.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)  

const PORT = 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))