import { createConnection } from 'typeorm'

import typeOrmConfig from '../ormconfig'
import { Recording } from '../entity/Recording'
import got from 'got'

const stackoverflowUrl = (unanswered = false): string =>
  `https://api.stackexchange.com/2.2/questions${
    unanswered ? '/unanswered' : ''
  }`

const main = async (): Promise<void> => {
  const connection = await createConnection({
    ...typeOrmConfig,
    entities: [Recording],
  })

  const now = new Date()
  const todate = Math.floor(Number(now) / 1000)
  const fromdate = todate - 3600 + 1

  const options = {
    searchParams: {
      pagesize: 1,
      fromdate,
      todate,
      site: 'stackoverflow',
      filter: '!3ugOCpzcfBz9QEr8Ve.I',
    },
  }

  const { total: asked } = await got(stackoverflowUrl(), options).json()

  const { total: unanswered } = await got(
    stackoverflowUrl(true),
    options
  ).json()

  const record = new Recording()
  record.asked = asked
  record.answered = asked - unanswered
  record.unixTs = todate

  record.collectedAt = now.toISOString()

  await record.save()
  await connection.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
