
# Remove any existing rows from this table before adding to it;
# this ensures that the table will always be in exactly the same
# state after running the seed command; keeps things predictable!
Planet.destroy_all

puts "Populating the solar system..."

Planet.create name: 'Earth', orbit: 1, mass: 1, diameter: 1, moons: 1, image: 'https://scitechdaily.com/images/earth-losing-mass.jpg'

Planet.create name: 'Mars', orbit: 687, mass: 0.2, diameter: 0.1, moons: 3, image: 'https://space-facts.com/wp-content/uploads/mars.jpg'

Planet.create name: 'Venus', orbit: 0.5, mass: 0.5, diameter: 0.05, moons: 2, image: 'https://cdn.mos.cms.futurecdn.net/pNX8eVGowB6WT8tyrTMufk-1200-80.jpg'

Planet.create name: 'Jupiter', orbit: 800, mass: 10_000, diameter: 500, moons: 13, image: 'http://cdn.sci-news.com/images/enlarge4/image_5608_2e-Jupiter.jpg'

puts "Done! Created #{ Planet.count } planets:"
puts Planet.pluck( :name ).join(', ')
