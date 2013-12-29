Stackpro::Application.routes.draw do
  get '/' => 'index#home'
  get '/about' => 'index#about'
end
