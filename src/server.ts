import './config/database.js'
import 'dotenv/config.js'

import express from 'express'
import cors from 'cors'

//import routes when they are created
import userRoutes from './routes/userRoutes.js'
import recordingRoutes from './routes/recordingRoutes.js'

const app = express()
//process.env.PORT process.env is an object in node holding my env information 
//.PORT is using dot notation to access my port variable and use it's value 
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

//once routes built put them here for the app
app.use('/api/user', userRoutes)
app.use('/api/recording', recordingRoutes)

app.listen(PORT, function(){
    console.log(`App running on ${PORT} port`)
})