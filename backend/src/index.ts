import express from 'express'
import path from 'path'
import { createConnection } from 'typeorm'
import typeOrmConfig from './ormconfig'
import { Recording } from './entity/recording'

const port = process.env.PORT ?? 1234
const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'build')

// the entity has to be imported here, nothing else will suffice
createConnection({ ...typeOrmConfig, entities: [Recording] })
  .then(() => {
    const app = express()

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

    app.get('/api/data', async (req, res, next) => {
      try {
        const record = new Recording()
        record.answered = 123
        record.asked = 234
        record.unixTs = Math.floor(new Date().getTime() / 1000)
        const now = new Date()
        record.formattedDate = `${now.getHours()}:${now.getMinutes()} ${
          now.getMonth() + 1
        }/${now.getDate()}`
        await record.save()
        res.json({ ok: true })
      } catch (e) {
        return next(e)
      }
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
  .catch((e) => {
    console.error('failed to connect', e)
  })
