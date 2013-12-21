desc "Queries Stackoverflow for newest data"
task :query_so => :environment do
  i = IndexController.new
  puts "Querying..."
  i.add_data
  puts "boom"
end