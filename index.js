import express from 'express'

const port = 3000
const app = express()

app.get('/hello', (req, res) => {
    res.send('Hello !!!')
})

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})