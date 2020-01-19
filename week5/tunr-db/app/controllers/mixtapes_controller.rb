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
    # mixtape = Mixtape.new mixtape_params   # or name: params[:mixtape][:name]
    # mixtape.user = @current_user
    # mixtape.save

    # 4.
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

    # can't use the 'check_ownership' method here because the
    # 'return' it uses will return from that method, and not
    # return from this controller action, i.e. it won't stop
    # the mixtape from being updated even when it's the wrong user
    # (this is because redirect_to DOES NOT STOP THE REST OF
    # THE CODE IN A METHOD FROM RUNNING)
    redirect_to login_path and return unless @mixtape.user == @current_user

    @mixtape.update name: params[:mixtape][:name]

    redirect_to mixtape_path(@mixtape.id)
  end

  def destroy
  end

  private
  def check_ownership
    redirect_to login_path and return unless @mixtape.user == @current_user
  end

end
