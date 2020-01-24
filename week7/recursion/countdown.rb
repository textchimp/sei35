
# iterative solution
def countdown( n=10 )

  while n >= 0
    puts n
    n -= 1  # gets us closer to terminating the loop
    sleep 0.3
  end

  puts 'Blast off!'

end

# countdown()

# recursive solution

# variables
# functions
# conditionals

def countdown_r( n )

  # Define a 'base case': a condition under which the function STOPS
  # calling itself recursively - otherwise, infinite loop (until 'stack calld depth exceeded')
  if n < 0
    puts 'Blast off!'
  else
    # Recursive case:
    # The function calls itself, BUT it does so in a way that always brings it a step closer
    # to reaching the base case, where the recursion will be stopped (by the above condition)
    puts n
    sleep 0.3
    countdown_r( n - 1 )  # recursive call: the function calls itself, from within itself
  end

end

countdown_r(10)
