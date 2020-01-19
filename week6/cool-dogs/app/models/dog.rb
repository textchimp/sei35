class Dog < ApplicationRecord

  # Tell geocoder where to look to get the human-readable address string
  # Which it will use to work out the lat/long coordinates
  geocoded_by :address

  # Tell geocoder to actually turn the above address into latitude
  # and longitude GPS coordinates (by doing a lookup in a remote API)
  # any time you create or update a Dog item
  after_validation :geocode

end
