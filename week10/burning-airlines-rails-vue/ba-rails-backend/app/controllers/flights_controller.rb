class FlightsController < ApplicationController

  def index
    render json: Flight.all, include: [ :airplane, reservations: { include: :user } ]
  end

  def show
    # render flight by ID, include reservations, include airplane rows & cols

    flight = Flight.find params[:id]

    # sleep 2


    # Create a hash whose keys look like 'row-col' with a value of true for
    # each booked seat
    # reservations = ....
    reservations_lookup = {}
    user_reservations_lookup = {}

    fake_current_user_id = 16   # use current_user in a real system with working auth

    flight.reservations.each do |res|
      if res.user_id == fake_current_user_id
        user_reservations_lookup["#{res.row}-#{res.col}"] = 1
      else
        reservations_lookup["#{res.row}-#{res.col}"] = 1
      end
    end # each

    render json: {
        flight: flight,
        reservations: reservations_lookup,
        user_reservations: user_reservations_lookup
      },
      include: {
        # reservations: {},
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
