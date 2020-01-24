
 def fib( n )

   a = 1
   b = 1

   n.times do

     temp = a
     a = b
     b = a + temp

     # a, b = b, (a + b)
   end

   a  # return this value
 end

# puts fib( 8 )

def fib_r( n )
  # Define the base case (no recursion)
  if n < 2
    return 1
  else
    # Recursive call
    return fib_r(n - 1) + fib_r(n - 2)
  end
end # fib_r

require 'pry'; binding.pry
puts 'stop here'
