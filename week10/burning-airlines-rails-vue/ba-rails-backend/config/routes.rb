Rails.application.routes.draw do

  get '/flights' => 'flights#index'
  get '/flights/:id' => 'flights#show'
  
  get '/flights/search/:origin/:destination' => 'flights#search'

end
