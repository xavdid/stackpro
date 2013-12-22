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
  end

  # data points
  # id: unix timestamp for end of the hour
  # asked: total asked
  # unanswered: total unanswered
  # percentage: a/u * 100

end