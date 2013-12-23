class IndexController < ApplicationController
  protect_from_forgery with: :null_session
  
  def home
    read_db
    t = Time.now
    #this should get the past 24 hours worth of points, maybe displaying 4 at a time by default?
    prev = 24

    #most recent PREV data points 
    @response = @coll.find({:id=>{'$gt'=>t.to_i-(3600*prev)}}).to_a


    # this could probably be some sort of object is js wasn't so finnicky
    @dates = []
    @asked = []
    @unanswered = []
    @percentage = []

    @response.each do |i|
      @dates.push(doctor(Time.at(i["id"]).to_s))
      @asked.append(i["asked"])
      @unanswered.append(i["unanswered"])
      @percentage.append(i["percentage"])
    end


  end

  def read_db
    @client ||= Mongo::MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
    @db ||= @client.db('kinect')
    @coll ||= @db['data_points']
  end

  # to repair time!

  def doctor(t)
    a = t.split
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
    return a

  end

  # data points
  # id: unix timestamp for end of the hour
  # asked: total asked
  # unanswered: total unanswered
  # percentage: a/u * 100
end