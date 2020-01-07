Rails.application.routes.draw do

  # CREATE
  # 1. New (blank) form
  get '/planets/new' => 'planets#new'
  # 2. Form submit, create, redirect
  post '/planets' => 'planets#create'

  # READ
  # 1. index of planets
  get '/planets' => 'planets#index'
  # 2. show page for one planet
  get '/planets/:id' => 'planets#show', as: 'planet'

  # UPDATE
  # 1. Pre-filled edit form
  get '/planets/:id/edit' => 'planets#edit', as: 'planet_edit'
  # 2. Form submit, update, redirect
  post '/planets/:id' => 'planets#update'

  # DESTROY
  get '/planets/:id/delete' => 'planets#destroy', as: 'planet_destroy'

end
