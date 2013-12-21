class IndexController < ApplicationController
  
  def home
    @answer = 'got it from ruby'
  end

  def read_db
    @client ||= MongoClient.from_uri('mongodb://d:b@ds053428.mongolab.com:53428/kinect')
    @db ||= @client.db('stackpro')
    # @coll ||= @db['db_cookie']
    # @cook ||= @coll.find_one
  end

end