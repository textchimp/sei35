# Air Conditioning
# Ask the user what the current temperature is, if the A/C is functional, and what temperature they wish it was.
# If the airconditioner is functional and the current temperature is above the the desired temperature... display "Turn on the A/C Please"
# If the airconditioner is non-functional and the current temperature is above the the desired temperature... display "Fix the A/C now! It's hot!"
# If the airconditioner is non-functional and the current temperature is below the the desired temperature... display "Fix the A/C whenever you have the chance... It's cool..."

print "Enter current temp: "
current_temp = gets.to_f

print "Is the AC working? (y/n): "
ac_working = gets.chomp.downcase

print "What is the desired temp?: "
desired_temp = gets.to_f

# p current_temp, ac_working, desired_temp

if ac_working == "y"

  # working
  if current_temp > desired_temp
    puts "Turn on the A/C Please"
  end

else

  # not working
  if current_temp > desired_temp
    puts "Fix the A/C now! It's hot!"
  else
    puts "Fix the A/C whenever you have the chance... It's cool..."
  end


end
