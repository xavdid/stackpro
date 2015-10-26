require 'sinatra'
require 'mongo'
require 'tilt/sass'
require 'tilt/haml'
require 'pp'

configure do
  if settings.development?
    require 'dotenv'
    Dotenv.load
  end
  Mongo::Logger.logger.level = ::Logger::FATAL
  set :db, Mongo::Client.new(ENV['MONGOLAB_URI'])
end

get '/' do
  t = Time.now
  # how many hours max to go back
  prev = 48

  # shouldn't need to sort, data will always be in order it went in
  # just in case: .sort({'unix'=>1})
  @r = settings.db[:data_points].find({
    # unix: {'$gt' => t.to_i - (3600 * prev)} # remove to find all
  }).to_a

  pp @r

  @dates = []
  @asked = []
  @unanswered = []
  @percentage = []
 
  @r.each do |i|
    @dates << (i["timestamp"])
    @asked << (i["asked"])
    @unanswered << (i["unanswered"])
    @percentage << (i["percentage"])
  end

  haml :index
end

get '/about' do
  haml :about
end

get '/styles.css' do
  scss :the
end