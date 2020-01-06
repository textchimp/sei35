class MoviesController < ApplicationController

  def form
  end

  def get_results

    @query = params[:search_text]

    url = "https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=#{ @query }"
    response = HTTParty.get url

    @results = response['results']

  end


  def movie_info

    # Make HTTParty request to different URL which accepts a movie ID
    # as part of the URL, to get detailed info for a single movie by ID

  end



end
