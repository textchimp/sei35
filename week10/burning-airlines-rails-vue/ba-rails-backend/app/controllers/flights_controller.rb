class FlightsController < ApplicationController

  def index
    render json: Flight.all, include: [ :airplane, reservations: { include: :user } ]
  end

  def show
    # render flight by ID, include reservations, include airplane rows & cols

    flight = Flight.find params[:id]

    # sleep 2

    render json: flight, include: {
      reservations: {},
      airplane: { only: [:name, :rows, :cols] }
    }

  end

  def search
    results = Flight.where(
      origin: params[:origin],
      destination: params[:destination]
    )

    # sleep 3  # Fake a slow network connection

    render json: results, include: {
      airplane: { only: [:name] }
    },
    except: [ :created_at, :udpated_at ],
    methods: [ :departure_date_formatted ]  # include the result of running these methods

  end

end
