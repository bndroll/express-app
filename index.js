import express from 'express'
import { userRouter } from './users/users.js'

const port = 3000
const app = express()

app.get('/hello', (req, res) => {
    res.send({message: 'hello get'})
})

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})