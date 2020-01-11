class ArtistsController < ApplicationController

  # CREATE
  def new
    @artist = Artist.new
  end

  def create
    Artist.create artist_params  # use the filtered version of the form params

    redirect_to artists_path  # Go to the index page, /artists
  end

  # READ
  def index
    @artists = Artist.all
  end

  def show
    @artist = Artist.find params[:id]
  end

  # UPDATE
  def edit
    @artist = Artist.find params[:id]
  end

  def update
    artist = Artist.find params[:id]
    artist.update artist_params   # also use the strong params for the update

    redirect_to artist_path(artist.id)
  end

  # DESTROY
  def destroy
    Artist.destroy params[:id]

    redirect_to artists_path   # back to the index, /artists
  end

  private

  # Strong params! Acts like a doorman, only letting through the specified table fields
  def artist_params
    params.require(:artist).permit( :name, :nationality, :dob, :period, :roundness, :bio, :image )
  end

end
