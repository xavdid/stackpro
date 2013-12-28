class IndexController < ApplicationController
  protect_from_forgery with: :null_session
  
  def home
    read_db
    t = Time.now
    #this should get the past 24 hours worth of points, maybe displaying 4 at a time by default?
    prev = 24

    # most recent PREV data points 
    # shouldn't need to sort, data will always be in order it went int
    # just in case: .sort({'unix'=>1})
    @response = @coll.find({:unix=>{'$gt'=>t.to_i-(3600*prev)}}).to_a

    # make this callable, or just always pass front the max and slice what js shows?
    @dates = []
    @asked = []
    @unanswered = []
    @percentage = []

    # I actually should, the more intense processing should be server side
    @response.each do |i|
      @dates.push(i["timestamp"])
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

  # data points
  # id: unix timestamp for end of the hour
  # asked: total asked
  # unanswered: total unanswered
  # percentage: a/u * 100
end