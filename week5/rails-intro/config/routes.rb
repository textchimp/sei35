Rails.application.routes.draw do

  # The root or '/' route is special
  root to: 'pages#funny'
  # get '/' => 'pages#funny'

  # Define a route to handle:
  # VERB PATH => 'CONTROLLER#METHOD'
  get '/info' => 'pages#information'

  # Dynamic path - ends up in params[:recipient], same as Sinatra
  get '/hello/:recipient' => 'pages#say_hello_to'

  # CALCULATOR

  # 1. Blank form
  get '/calc' => 'calculator#home'

  # 2. Form submits here (use a get request), show result
  get '/calc/answer' => 'calculator#do_calculation'

end
