desc "Queries Stackoverflow for newest data"
task :query_so => :environment do
  # include Mongo
  puts 'querying'
  @client ||= Mongo::MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
  @db ||= @client.db('kinect')
  @coll ||= @db['data_points']

  t = Time.now

  start_time = t.to_i - 3599
  end_time = t.to_i

  r = HTTParty.get("https://api.stackexchange.com/2.1/questions?pagesize=1&fromdate=#{start_time}&todate=#{end_time}&site=stackoverflow&filter=!3ugOCpzcfBz9QEr8Ve.I")

  r = JSON.parse(r.body)

  asked = r["total"].to_f

  r = HTTParty.get("https://api.stackexchange.com/2.1/questions/unanswered?pagesize=1&fromdate=#{start_time}&todate=#{end_time}&site=stackoverflow&filter=!3ugOCpzcfBz9QEr8Ve.I")

  r = JSON.parse(r.body)

  unans = r["total"].to_f

  perc = unans / asked * 100

  data = {id: end_time, asked: asked, unanswered: unans, percentage: perc}

  @coll.save(data)
  puts 'boom',t
end