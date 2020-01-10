class Song < ApplicationRecord
  belongs_to :album, optional: true   # lets us create a song without specifying the album
  belongs_to :artist, optional: true  # ...or the artist

  # This is one side of the many-to-many association;
  # it tells ActiveRecord to use the 'genres_songs'
  # join table to find the genres for this song.
  has_and_belongs_to_many :genres

  has_and_belongs_to_many :mixtapes

end
