desc "Queries Stackoverflow for newest data"
task :query_so => :environment do
  # include Mongo
  puts 'querying'
  @client ||= Mongo::MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
  @db ||= @client.db('kinect')
  @coll ||= @db['data_points']

  t = Time.now

  data = {}

  start_time = t.to_i - 3599
  end_time = t.to_i

  r = HTTParty.get("https://api.stackexchange.com/2.1/questions?pagesize=1&fromdate=#{start_time}&todate=#{end_time}&site=stackoverflow&filter=!3ugOCpzcfBz9QEr8Ve.I")

  r = JSON.parse(r.body)

  data[:asked] = r["total"].to_f

  r = HTTParty.get("https://api.stackexchange.com/2.1/questions/unanswered?pagesize=1&fromdate=#{start_time}&todate=#{end_time}&site=stackoverflow&filter=!3ugOCpzcfBz9QEr8Ve.I")

  r = JSON.parse(r.body)

  data[:unanswered] = r["total"].to_f

  data[:percentage] = data[:unanswered] / data[:asked] * 100

  data[:unix] = end_time

  a = t.to_s.split
  a.pop
  a = a.reverse
  # removing seconds from time
  ti = a[0].split(":")
  ti.pop
  a[0] = ti.join(":")
  # removing year from date
  da = a[1]
  da = da.split('-').rotate
  da.pop
  a[1] = da.join('/')
  a = a.join(' ')

  data[:timestamp] = a

  @coll.save(data)
  puts 'boom',t,data
end


desc "Clears data over a certain age"
task :clear_old => :environment do
  puts 'querying'
  @client ||= Mongo::MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
  @db ||= @client.db('kinect')
  @coll ||= @db['data_points']

  t = Time.now

  # number of hours to keep
  prev = 72

  threshold = t.to_i - (3600 * prev)

  @coll.remove({'unix' => {'$lt' => threshold}})


  puts 'Removed everything before',Time.at(threshold),'at',t

end