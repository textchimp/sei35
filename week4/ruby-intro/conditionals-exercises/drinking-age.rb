# 1. Drinking age?
# Ask the user for their age.
# Remember that anytime you get input, it is a string, so you will need to change the age input to a number.
# If age is less than 18, print an appropriate message.
# If the age is equal to or over 18, print a different message.

print "How old are you?: "
age = gets.to_i   # no need for .chomp if we use .to_i

# age = age.to_i

puts "You entered #{age}"

if age < 18
  puts "Scram, kiddo! Go drink some cordial in the sandpit."
else
  puts "Come on in and enjoy your liver damage!"
end
