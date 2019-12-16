# Title: Guess The Number
# Activity:
# You are to generate a basic "guess my number" game. The computer will pick a random number between 0 and 10. The user will guess the number until they guess correctly.
# Specification:
# The user should be asked to guess a number
# If the user's guess is correct, the user should see a congratulatory message
# If the user's guess is not correct, the user should be asked to guess the number again.
# Extensions:
# Let the user choose the maximum value (so they can play a long game with a random value between 0 and 10000, for example).
# Give feedback to the user: "Wrong, guess higher!" or "Wrong, guess lower!"

require 'colorize'  # load the colorize library

print 'Enter maximum value: '
max_value = gets.to_i

secret_number = rand(0..max_value) # include max

# initialise with a number that cannot be correct,
# to guarantee we will get into the loop at least once
guess = -1

# while guess != secret_number
until guess == secret_number

  print 'Enter your guess: '
  guess = gets.to_i

  # if guess != secret_number
  #   puts 'Wrong! Guess again...'
  # end

  # pause the code here, and open pry
  # require 'pry'; binding.pry

  if guess > secret_number
    puts "Guess lower!".red
  elsif guess < secret_number
    puts "Guess higher!".yellow
  end


end  # until

puts "Correct!".green
