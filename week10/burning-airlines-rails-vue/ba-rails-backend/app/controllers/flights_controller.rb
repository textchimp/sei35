class FlightsController < ApplicationController

  def index
    render json: Flight.all, include: [ :airplane, reservations: { include: :user } ]
  end

  def show
    # render flight by ID, include reservations, include airplane rows & cols
  end

  def search
    results = Flight.where(
      origin: params[:origin],
      destination: params[:destination]
    )

    render json: results, include: { airplane: { only: [:name] } }, except: [ :created_at, :udpated_at ]

  end

end
