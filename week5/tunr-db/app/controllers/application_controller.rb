class ApplicationController < ActionController::Base

  # Run the fetch_user method (which sets @current_user)
  # before running the code in every method of every controller
  before_action :fetch_user


  def fetch_user

    # Check if the session[:user_id] is set, and also make sure it
    # contains a valid (current) user ID - if so, we will set
    # an instance variable containing the user object.
    # By setting the variable here in the controller superclass,
    # it will be available to any action of any controller,
    # making it easy to check the login status of a user anywhere.

    if session[:user_id].present?
      @current_user = User.find_by id: session[:user_id]
    end

    # Delete this session (clear the ID from the session hash)
    # if the ID did not return a valid user
    unless @current_user.present?
      session[:user_id] = nil
    end

  end  # fetch_user

  def check_if_logged_in
    # Show pages can ONLY be seen by logged-in users
    redirect_to login_path unless @current_user.present?
  end

  def check_if_admin
    redirect_to login_path unless @current_user.present? && @current_user.admin?
  end


end # ApplicationController
