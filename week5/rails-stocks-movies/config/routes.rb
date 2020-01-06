Rails.application.routes.draw do

  # STOCKS

  # 1. Blank form
  get '/stocks' => 'stocks#form'

  # 2. Form submits here, does stock lookup, prints results
  get '/stocks/lookup' => 'stocks#do_lookup'

  # MOVIES

  # 1. Blank form
  get '/movies' => 'movies#form'

  # 2. Form submits here, do HTTParty API call, print results
  get '/movies/search' => 'movies#get_results'

  # 3. Details page (show page) for a single result
  get '/movies/results/:id' => 'movies#movie_info'

end
