require 'sinatra'
require 'sinatra/reloader'

get "/" do
  erb :intro
end

# Match any URL of the form:
# /calc/123/+/456
get "/calc/:first/:op/:second" do

  @first = params[:first].to_f
  @second = params[:second].to_f
  @op = params[:op]

  ## long way:
  # if @op == '+'
  #   @result = @first + @second
  # elsif @op == '-'
  #   @result = @first - @second
  # elsif @op == '*'
  #   @result = @first * @second
  # elsif @op == 'div'
  #   @result = @first / @second
  # else
  #   @result = 'invalid calculation'
  # end

  @result = case @op
  when '+'   then @first + @second
  when '-'   then @first - @second
  when '*'   then @first * @second
  when 'div' then @first / @second
  else
    @result = 'invalid calculation'
  end

  # mind-blown.gif
  # @result = @first.send( @op, @second )


  erb :calc
end


# Form-based calculator

# Show blank form
get "/calc" do
  erb :form
end

# Form submits to this route
get "/calc/result" do

  @first = params[:firstnum].to_f
  @second = params[:secondnum].to_f
  @op = params[:operator]

  @result = @first.send( @op, @second )

  # Turn params hash into string
  # and send it to the browser
  # (debugging only!)
  # params.inspect

  # Reuse our previous template
  # (works because our variable names
  # are the same in this block)
  erb :calc
end
