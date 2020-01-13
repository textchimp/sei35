
Song.destroy_all

s1 = Song.create! title: 'Achy Breaky Heart'
s2 = Song.create! title: 'Have a Safe Trip, Dear'
s3 = Song.create! title: 'Burn the Witch'
s4 = Song.create! title: 'Identikit'

puts "Created #{ Song.count } songs."


Artist.destroy_all

ar1 = Artist.create! name: 'Billy Ray Cyrus'
ar2 = Artist.create! name: 'June of 44'
ar3 = Artist.create! name: 'Radiohead'

puts "Created #{ Artist.count } artists."


Album.destroy_all

al1 = Album.create! title: 'Some Gave All', year: '1992'
al2 = Album.create! title: 'Engine Takes to the Water', year: '1998'
al3 = Album.create! title: 'A Moon-Shaped Pool', year: '2015'

puts "Created #{ Album.count } albums."


# Artist -> Songs associations:

# 'Achy Breaky Heart' is by Billy Ray Cyrus:
ar1.songs << s1
# The long way:
#  s1.update artist: ar1
# or
#  s1.update artist_id: ar1.id

# ActiveRecord re-purposes the '<<' (push) operator to let us add association
# items, in this case adding a song to the list of the artist's songs.
# What it actually does under the hood is set the 'artist_id' field to be
# the ar1.id integer value, in this song's row in the 'songs' table.

# 'Have a Safe Trip, Dear' is by June of 44
ar2.songs << s2

# Both 'Burn the Witch' and 'Identikit' are by Radiohead
ar3.songs << s3 << s4

puts "Songs by #{ Artist.last.name }: #{ Artist.last.songs.pluck(:title).join(', ') }"


# Album -> Songs associations:
al1.songs << s1   # 'Achy Breaky Heart' is on 'Some Gave All' (al1)
al2.songs << s2   # 'Have a Safe Trip, Dear' is on 'Engine Takes to the Water' (al2)
al3.songs << s3 << s4  # 'Burn the Witch' and 'Identikit' are both on 'A Moon-Shaped Pool'

puts "Songs on '#{ Album.last.title}': #{ Album.last.songs.pluck(:title).join(', ') } "

Genre.destroy_all

g1 = Genre.create! name: 'Nautical Rock'
g2 = Genre.create! name: 'Math Rock'
g3 = Genre.create! name: 'Paranoid Art-Rock'
g4 = Genre.create! name: 'Country'
g5 = Genre.create! name: 'Sadcore'
g6 = Genre.create! name: 'IDM'

puts "Created #{ Genre.count } genres."


# Genres <-> Songs associations (many-to-many):
s1.genres << g4
s2.genres << g1 << g2
s3.genres << g3 << g5
s4.genres << g3 << g5 << g6

puts "Genre '#{ g3.name }' has songs: #{ g3.songs.pluck(:title).join(', ') }"
puts "Song '#{ s4.title }' has genres: #{ s4.genres.pluck(:name).join(', ') }"


Mixtape.destroy_all

m1 = Mixtape.create! name: 'Driving Songs'
m2 = Mixtape.create! name: 'Make-out Music'
m3 = Mixtape.create! name: 'Code Jams'

puts "Created #{ Mixtape.count } mixtapes."

# Mixtapes <-> Songs many-to-many associations:
m1.songs << s1 << s2 << s3 << s4   # 'This mixtape contains these four songs'
m2.songs << s1 << s4
m3.songs << s2 << s3

puts "The mixtape '#{ m1.name }' contains these songs: #{ m1.songs.pluck(:title).join(', ') }"

# Alternately:
# s1.mixtapes << m1 << m3   # 'This song appears on these mixtapes'

User.destroy_all

u1 = User.create! name: 'Luke', email: 'luke@ga.co', password: 'chicken', admin: true
u2 = User.create! name: 'Mikaela', email: 'mikki@ga.co', password: 'chicken'
u3 = User.create! name: 'Nookie', email: 'nooknook@ga.co', password: 'chicken'

puts "Created #{ User.count } users."

# User -> Mixtapes associations (a user has many mixtapes):
u1.mixtapes << m1 << m3
u2.mixtapes << m2

puts "User #{ User.first.name} has mixtapes: #{ User.first.mixtapes.pluck(:name).join(', ') }"
