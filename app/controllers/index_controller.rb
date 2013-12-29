class IndexController < ApplicationController
  protect_from_forgery with: :null_session
  
  def home
    read_db
    t = Time.now
    
    prev = 48

     
    # shouldn't need to sort, data will always be in order it went int
    # just in case: .sort({'unix'=>1})
    @response = @coll.find({:unix=>{'$gt'=>t.to_i-(3600*prev)}}).to_a

    
    @dates = []
    @asked = []
    @unanswered = []
    @percentage = []

   
    @response.each do |i|
      @dates.push(i["timestamp"])
      @asked.append(i["asked"])
      @unanswered.append(i["unanswered"])
      @percentage.append(i["percentage"])
    end


  end

  # surely there's a better way to do this
  def read_db
    @client ||= Mongo::MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
    @db ||= @client.db('kinect')
    @coll ||= @db['data_points']
  end

  def about
  end  
end