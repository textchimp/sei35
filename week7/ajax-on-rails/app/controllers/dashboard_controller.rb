class DashboardController < ApplicationController

  def app
  end

  def dogs_index
    # AJAX version ONLY
    render json: Dog.all
  end

  def dogs_search
    render json: Dog.where(name: params[:query])
  end

  def uptime

    # Run the command and store the output
    @up = `uptime`

    response = {
      command: 'uptime',
      output: @up
    }

    respond_to do |format|
      format.html   # do nothing special, i.e. render the default template
      format.json { render json: response }  # render JSON in response to an AJAX request
    end # respond_to

  end # uptime action

  def cpu_hog

      # Run an command to see all processes on the system, ordered by highest CPU use to lowest,
      # split the output on the newline character to give us an array of lines, and then take only
      # the second line (the highest CPU process; the first line is the column headings line)
      hog = `ps xr`.split("\n").second  # [1]
      date = `date`

      response = {
        cpuHog: hog,
        currentDate: date,
        pointlessArray: ['one', 'two', 'three', 'four']
      }

      render json: response

    end  # cpu_hog

end  # controller
