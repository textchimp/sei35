class MixtapesController < ApplicationController

  before_action :check_if_logged_in, except: [ :index, :show ]

  def new
    @mixtape = Mixtape.new
  end

  def create

    # 1.
    # Mixtape.create name: params[:mixtape][:name], user: @current_user

    # 2.
    # mixtape =  Mixtape.create name: params[:mixtape][:name]
    # @current_user.mixtapes << mixtape

    # 3.
    @current_user.mixtapes.create name: params[:mixtape][:name]

    redirect_to mixtapes_path  # index of mixtapes
  end

  def index
    # Get ONLY the mixtapes which belong to the logged-in user
    # @mixtapes = Mixtape.where user: @current_user

    @mixtapes = Mixtape.all
  end

  def show
  end

  def edit
    @mixtape = Mixtape.find params[:id]
    check_ownership
  end

  def update
    @mixtape = Mixtape.find params[:id]

    redirect_to login_path and return unless @mixtape.user == @current_user

    puts "**************** UPDATED MIXTAPE ****************"
    redirect_to mixtape_path(@mixtape.id)
  end

  def destroy
  end

  private
  def check_ownership
    redirect_to login_path and return unless @mixtape.user == @current_user
  end

end
