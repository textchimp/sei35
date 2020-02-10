class FlightsController < ApplicationController
  def index
    render json: Flight.all
  end

  def show
  end

  def search
  end
end
