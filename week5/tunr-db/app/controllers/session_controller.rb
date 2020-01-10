class SessionController < ApplicationController
  def new
  end

  def create

    # See if the email address entered actually exists in the 'users' table
    user = User.find_by email: params[:email]

    # Did we find a user, and if we did, is the password correct?
    if user.present? && user.authenticate( params[:password] )
      # successful login

      # Get Rails to create a new key in a special system variable
      # called 'session'; this variable is remembered ACROSS REQUESTS!
      # (This persistent memory across requests is implemented using
      #  browser cookies, which are stored on your harddrives)
      session[:user_id] = user.id

      redirect_to user_path(user.id)  # go to show page (/users/10 or whatever)

    else
      # failed login (wrong credentials)

      flash[:error] = 'Invalid email or password'
      redirect_to login_path  # show the form again
    end


  end # create


  def destroy
    session[:user_id] = nil  # This logs out the user
    redirect_to login_path
  end

end
