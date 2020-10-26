import express from 'express'
import path from 'path'
import { createConnection } from 'typeorm'
import typeOrmConfig from './ormconfig'
import { Recording } from './entity/Recording'
import helmet = require('helmet')

const port = process.env.PORT ?? 1234
const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'build')

// the entity has to be imported here, nothing else will suffice
createConnection({ ...typeOrmConfig, entities: [Recording] })
  .then(() => {
    const app = express()
    app.use(helmet())

    app.use(express.static(frontendPath))
    app.get('/', function (req, res) {
      res.sendFile(path.join(frontendPath, 'index.html'))
    })

    app.get('/api/records', async (req, res, next) => {
      try {
        const records = await Recording.find()
        res.json(records)
      } catch (e) {
        return next(e)
      }
    })
    // might be too broad
    app.get('*', (req, res) => {
      res.status(404).json({ message: 'not found' })
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
  .catch((e) => {
    console.error('failed to connect', e)
  })
