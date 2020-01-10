class Album < ApplicationRecord
  has_many :songs

  # Through association: an album has many artists,
  # but not directly (i.e., there is no artist_id on
  # the 'albums' table), but VIA its songs
  # (because each song DOES have an artist_id)
  has_many :artists, through: 'songs'

  # custom model method to make it easy to get a single artist
  # object for an album
  def artist
    self.artists.first
  end

end
