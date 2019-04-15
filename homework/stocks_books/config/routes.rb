Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root :to => 'pages#hello' # get '/' => 'pages#hello'
  get '/hello' => 'pages#hello'

  get '/stocks/' => 'stocks#show'
  get '/stocksresults' => 'stocks#result'


  get '/books/' => 'books#show'
  get '/result' => 'books#result'

end
