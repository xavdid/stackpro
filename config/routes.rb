Stackpro::Application.routes.draw do
  get '/' => 'index#home'
  get '/add' => 'index#add_data'
end
