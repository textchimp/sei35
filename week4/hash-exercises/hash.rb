# A. Given the following data structure:
a = ["Anil", "Erik", "Jonathan"]

# How would you return the string "Erik"?
a[ 1 ]

# How would you add your name to the array?
a.push( "Grrant")
# or
a << "Grant"

# B. Given the following data structure:
h = {0 => "Zero", 1 => "One", :two => "Two", "two" => 2}

# How would you return the string "One"?
p h[ 1 ]

# How would you return the string "Two"?
p h[ :two ]

# How would you return the number 2?
p h[ "two" ]

# How would you add {3 => "Three"} to the hash?
h[ 3 ] = "Three"

# How would you add {:four => 4} to the hash?
h[ :four ] = 4


# C. Given the following data structure:
is = {true => "It's true!", false => "It's false"}

# What is the return value of is[2 + 2 == 4]?
# => "It's true!"

# What is the return value of is["Erik" == "Jonathan"]?
#=> "It's false"

# What is the return value of is[9 > 10]?
# => "It's false"

# What is the return value of is[0]?
# => nil

# What is the return value of is["Erik"]?
# => nil

# D. Given the following data structure:
users = {
  "Jonathan" => {
    :twitter => "tronathan",
    :favorite_numbers => [12, 42, 75],
  },
  "Erik" => {
    :twitter => "sferik",
    :favorite_numbers => [8, 12, 24],
  },
  "Anil" => {
    :twitter => "bridgpal",
    :favorite_numbers => [12],
  },
}

# How would you access Jonathan's Twitter handle (i.e. the string "tronathan")?
p users[ "Jonathan" ][ :twitter]
# How would you add the number 7 to Erik's favorite numbers?
p users[ "Erik" ][ :favorite_numbers ] << 7

# How would you add yourself to the users hash?

users[ "Luke" ] = {
   twitter: 'textchimp',
   favorite_numbers: [23, 5, 6789235, 12]
 }

# How would you return the array of Erik's favorite numbers?
users[ "Erik" ][ :favorite_numbers ]

# How would you return the smallest of Erik's favorite numbers?
users[ "Erik" ][ :favorite_numbers ].min
# or
users[ "Erik" ][ :favorite_numbers ].sort.first  # it works, but why bother

# How would you return an array of Anil's favorite numbers that are also even?
anils_even = users[ "Anil" ][ :favorite_numbers ].select do |num|
  num.even?
end
p anils_even


# How would you return an array of the favorite numbers common to all users?

# initialise to first array instead of [], otherwise we never get past the []
faves = users.values.first[ :favorite_numbers ]

users.values.each do |user|
  puts "comparing #{faves.to_s} with #{ user[:favorite_numbers].to_s }"
  faves = faves & user[ :favorite_numbers ]
end

# annoyingly magical one-liner
users.values.map { |data| data[:favorite_numbers]  }.reduce &:&    # WTF

# How would you return an array containing all users' favorite numbers, sorted, and excluding duplicates?

# First example, to get an array of just the twitter handles:
users.values.map { |data| data[:twitter] }

# 👆 i.e. map can be used to convert between data structures...


# Similarly, to get an array of just the favourite number arrays
# (then flatten it, remove duplicates, and finally sort it):
users.values.map { |user| user[:favorite_numbers]  }.flatten.uniq.sort

# In other words:
# First get an array of just the favorite numbers arrays:
# users.values.map { |data| data[:favorite_numbers] }
# => [[12, 42, 75], [8, 12, 24], [12, 14, 85]]
# ... then 'flatten' it, i.e. remove the nesting to get a flat array of the numbers:
# users.values.map { |data| data[:favorite_numbers] }.flatten
# => [12, 42, 75, 8, 12, 24, 12, 14, 85]
# ... then remove duplicates from the flattened array and finally sort it!
# users.values.map { |data| data[:favorite_numbers] }.flatten.uniq.sort
# => [8, 12, 14, 24, 42, 75, 85]

require 'pry'; binding.pry
p "hi"
