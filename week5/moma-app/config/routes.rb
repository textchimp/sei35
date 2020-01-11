Rails.application.routes.draw do

  # CREATE
  # 1. Blank form
  get '/artists/new' => 'artists#new', as: 'new_artist'
  # 2. Form submit, DB create, redirect
  post '/artists' => 'artists#create'   # helper for this is the same as for index
                                        # i.e. artists_path

  # READ
  # 1. Index of artists
  get '/artists' => 'artists#index'
  # 2. Show page for a single artist details
  get '/artists/:id' => 'artists#show', as: 'artist'  # gives us artist_path(ID)

  # UPDATE
  # 1. Pre-filled form for an artist
  get '/artists/:id/edit' => 'artists#edit', as: 'edit_artist'  # gives us edit_artist_path(ID)
  # 2. Form submit, update DB, redirect
  patch '/artists/:id' => 'artists#update'

  # DESTROY
  delete '/artists/:id' => 'artists#destroy'


  # Create ALL the CRUD routes for the Work model
  resources :works


end
