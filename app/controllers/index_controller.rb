class IndexController < ApplicationController
  protect_from_forgery with: :null_session
  
  def home
    read_db
    t = Time.now
    #this should get the past 24 hours worth of points, maybe displaying 4 at a time by default?
    prev = 8

    #most recent PREV data points 
    @response = @coll.find({:id=>{'$gt'=>t.to_i-(3600*prev)}}).to_a

    # make this callable, or just always pass front the max and slice what js shows?
    # this could probably be some sort of object is js wasn't so finnicky
    @dates = []
    @asked = []
    @unanswered = []
    @percentage = []

    @responses = []
    # don't need this, passing objects (pull out bson, probs)
    # I actually should, the more intense processing should be server side
    @response.each do |i|
      @dates.push(doctor(Time.at(i["id"]).to_s))
      @asked.append(i["asked"])
      @unanswered.append(i["unanswered"])
      @percentage.append(i["percentage"])
      @responses.push(i.to_json)
    end


  end

  def read_db
    @client ||= Mongo::MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
    @db ||= @client.db('kinect')
    @coll ||= @db['data_points']
  end

  # to repair time!
  # don't need this, it's done in rake
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