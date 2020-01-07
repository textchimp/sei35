
class PlanetsController < ApplicationController

  # Bypass the automatic forms security checking done by Rails
  # ... just for today!
  skip_before_action :verify_authenticity_token, raise: false

  # CREATE

  # 1. New blank form
  def new
  end

  # 2. Form submit, create, redirect
  def create

    Planet.create(
      name: params[:name],
      image: params[:image],
      orbit: params[:orbit],
      diameter: params[:diameter],
      mass: params[:mass],
      moons: params[:moons]
    )

    # Create actions have no template of their own, and we also
    # want to avoid accidental form resubmission; so we redirect
    redirect_to( planets_path )  # /planets

  end

  # READ

  # 1. Index of planets
  def index
    @planets = Planet.all
  end

  # 2. Details page for one planet
  def show
    # Because of the '/planets/:id' route,
    # we get acccess to the ID used in the URL
    # in the params variable; so if the URL
    # was /planets/25, the variable params[:id]
    # will contain the string '25'
    @planet = Planet.find params[:id]

  end # show


  # UPDATE

  # 1. Pre-filled edit form
  def edit
    @planet = Planet.find params[:id]
  end

  # 2. Form submit, udpate DB, redirect
  def update

    planet = Planet.find params[:id]
    planet.update(
      name: params[:name],
      image: params[:image],
      orbit: params[:orbit],
      diameter: params[:diameter],
      mass: params[:mass],
      moons: params[:moons]
    )

    # Redirect to the show page: /planets/:id
    redirect_to planet_path(planet.id)

  end


  # DESTROY
  def destroy
    Planet.destroy params[:id]

    # Redirect to the index, /planets
    redirect_to( planets_path )
  end


end # class
