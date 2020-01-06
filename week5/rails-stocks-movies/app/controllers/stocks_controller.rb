
class StocksController < ApplicationController

  def form
  end

  def do_lookup

    @symbol = params[:stock_symbol]

    StockQuote::Stock.new(api_key: 'pk_16a849fd637243a79fff90fa4d42bc5d')

    stock = StockQuote::Stock.quote( @symbol )

    # binding.pry

    @price = stock.latest_price
    @company = stock.company_name

  end


end
