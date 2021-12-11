import express from 'express'


const port = 3000
const app = express()

app.route('/hello')
    .get((req, res) => {
        res.send({message: 'hello get'})
    })
    .post((req, res) => {
        res.status(201).json({message: 'hello post'})
    })

app.get('/file', (req, res) => {
    res.download('/test.pdf', 'tesssst.pdf')
})

app.get('/redirect', (req, res) => {
    res.redirect(301, 'https://example.com')
})

app.get('/qwe', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send('set example')
})

app.get('/cookie', (req, res) => {
    res.cookie('token', 'qweqwe', {
        domain: '',
        path: '/',
        secure: true,
        expires: 600000000
    })

    res.clearCookie('token')

    res.send('cookie')
})

app.get('/nores', (req, res) => {
    res.status(404).end()
})

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})