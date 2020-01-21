Rails.application.routes.draw do

  get 'dashboard/app'
  get '/dashboard' => 'dashboard#app'  # our main SPA interface

  # API endpoints: AJAX requests are made to these routes:
  get '/uptime' => 'dashboard#uptime'
  get '/cpuhog' => 'dashboard#cpu_hog'

  get '/dogs'   => 'dashboard#dogs_index'

end
