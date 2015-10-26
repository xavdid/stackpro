#!/usr/bin/env rake

require 'httparty'

task :env do
  require './stackpro'
end

task default: [:query_so]

desc "Queries StackOverflow for newest data"
task query_so: [:env] do
  # include Mongo
  puts "running at #{Time.now}"

  end_time = Time.now.to_i
  # go back almost an hour ago
  start_time = end_time - 3599

  data = {}

  answered_resp = JSON.parse(HTTParty.get("https://api.stackexchange.com/2.1/questions?pagesize=1&fromdate=#{start_time}&todate=#{end_time}&site=stackoverflow&filter=!3ugOCpzcfBz9QEr8Ve.I").body)

  asked_resp = JSON.parse(HTTParty.get("https://api.stackexchange.com/2.1/questions/unanswered?pagesize=1&fromdate=#{start_time}&todate=#{end_time}&site=stackoverflow&filter=!3ugOCpzcfBz9QEr8Ve.I").body)


  data = {
    asked: answered_resp["total"].to_f,
    unanswered: asked_resp["total"].to_f,
    unix: end_time,
    timestamp: Time.at(end_time).strftime('%H:%m %m/%d')
  }

  # depends on other things, so it goes alone
  data[:percentage] = (data[:unanswered] / data[:asked] * 100).round(3)

  result = settings.db[:data_points].insert_one(data)
  puts 'boom', result.inspect
end


task clear_old: [:env] do 
  # number of hours to keep
  prev = 72

  threshold = Time.now - (3600 * prev)

  settings.db[:data_points].delete_many({'unix' => {'$lt' => threshold.to_i}})

  puts "Removed everything before #{threshold}"
end