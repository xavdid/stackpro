class IndexController < ApplicationController
  protect_from_forgery with: :null_session
  include Mongo
  
  def home
    @answer = 'got it from ruby'
  end

  def read_db
    @client ||= MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
    @db ||= @client.db('kinect')
    @coll ||= @db['data_points']
    # @cook ||= @coll.find_one
  end


  def add_data
    read_db
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
    render json: {response: 200}

  end

  # data points
  # id: unix timestamp for end of the hour
  # asked: total asked
  # unanswered: total unanswered
  # percentage: a/u * 100

end