import http from 'http'

const host = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/hello':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('Hello !')
                    break;
            }
            break;
    }
})

server.listen(port, host, () => {
    console.log(`server activated in ${host}:${port}`)
})