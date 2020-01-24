
arr = [ 1,2,3,4,5,6 ]   # (1..6).to_a

# arr.each do |item|
#   puts item
# end

def recursive_each( array, indent=0 )

  # 1. REMOVE the first item from the array, and print it
  # first = array.shift

  # first = array.first
  # rest  = array[1..-1]

  first, *rest = array   # 'parallel assignment' using 'splat' operator; JS 'destructuring'

  # puts first

  spaces = "      " * indent

  puts "#{spaces} >>>> starting recursive_each( #{array} )"
  puts "#{spaces} first: #{ first }"
  puts "#{spaces} rest: #{ rest }"

  # 2. As long as there are still items left in the remaining array
  #    call ourself with the remaining array as argument
  if rest.any?   # rest.length > 0
    recursive_each( rest, indent + 1 )
  end

  puts "#{spaces} <<<< returning from recursive_each( #{array} )"



end

recursive_each( arr )
