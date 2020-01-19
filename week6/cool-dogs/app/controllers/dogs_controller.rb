class DogsController < ApplicationController
  def map
    # We don't want to expose every table column to the frontend;
    # .select gives us just specific columns (for all the rows
    # by default)
    @dogs = Dog.select(:name, :latitude, :longitude)
  end
end
