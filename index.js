import express from 'express'

const port = 3000
const app = express()

app.all('/hello', (req, res, next) => {
    console.log(`all middleware`)
    next()
})

const cb1 = (req, res, next) => {
    console.log('callback 1')
    next()
}

const cb2 = (req, res, next) => {
    console.log('callback 2')
    next()
}

app.route('/users')
    .get(cb1, cb2, (req, res) => {
        res.send('hello from get!')
    })
    .post(cb1, (req, res) => {
        res.send('hello from post!')
    })

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})