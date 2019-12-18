require 'sinatra'
require 'sinatra/reloader'
require 'stock_quote'

# Show the blank form
get '/' do
  erb :stock_form
end

# Form submits to here
get '/lookup' do
  @symbol = params[:stock_symbol]

  # Initialise the library with an API key
  StockQuote::Stock.new(api_key: 'pk_16a849fd637243a79fff90fa4d42bc5d')

  # Perform a lookup, using the submitted text
  stock = StockQuote::Stock.quote @symbol

  # Pull out some values to use in the template
  @price = stock.latest_price
  @company = stock.company_name

  # you could optionally make the whole
  # stock variable available to the
  # template: @stock = StockQuote:: etc...

  erb :results
end
