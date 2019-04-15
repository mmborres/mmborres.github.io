Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root :to => 'pages#hello' # get '/' => 'pages#hello'
  get '/hello' => 'pages#hello'

  get '/secretnum/' => 'secretnum#show'
  get '/secretnum/result' => 'secretnum#result'


  get '/magic8/' => 'magic8#show'
  get '/magic8/result' => 'magic8#result'

  get '/rockpaper/' => 'rockpaper#show'
  get '/rockpaper/result' => 'rockpaper#result'
end
