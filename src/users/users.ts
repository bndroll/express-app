import express from 'express'

export const userRouter = express.Router()

userRouter.use((req, res, next) => {
    console.log('users middleware')
    next()
})

userRouter.get('/login', (req, res) => {
    res.send('login')
})

userRouter.get('/register', (req, res) => {
    res.send('register')
})