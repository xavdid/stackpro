import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT ?? 1234

const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'build')

app.use(express.static(frontendPath))
app.get('/', function (req, res) {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

app.get('/api/data', (req, res) => {
  res.json({
    items: [
      { a: 1, b: 2 },
      { a: 3, b: 5 },
    ],
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
