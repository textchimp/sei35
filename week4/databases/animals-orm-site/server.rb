require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'  # to talk to our SQL database
require 'pry'
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',      # What is the DB system we are using?
  database: 'database.db'  # Where is the actual DB data?
)

# Log out all the SQL queries constructed by ActiveRecord
# .... so we can be grateful we don't have to write that SQL any more
ActiveRecord::Base.logger = Logger.new STDERR

# This code will run after any specific route block runs;
# this is a Sinatra feature (not ActiveRecord) that saves us
# from having to put this connection-closing code at the end
# of every route block.
after do
  ActiveRecord::Base.connection.close
end

# This class is the capitalised singular version of our SQL table name 'animals'.
# It inherits all of its features from the ActiveRecord Base class.
# From now on we can run queries on our 'animals' table by calling methods
# on the Animal class.
class Animal < ActiveRecord::Base
  has_many :spotters    # this assumes 'animal_id' is defined in the 'spotters' table
end

class Spotter < ActiveRecord::Base
  belongs_to :animal   # as above, assumes 'animal_id' is defined in 'spotters' table
end

# Test the ActiveRecord connection without needing to load URLs in the browser
# binding.pry



# DRY up our routes by creating a reusable DB query function
def db_query( sql )

  db = SQLite3::Database.new 'database.db'
  db.results_as_hash = true
  # Debugging output in the terminal:
  puts '======================='
  puts sql
  puts '======================='
  results = db.execute sql
  db.close

  results   # return the result of the query
end


# Home page
get '/' do
  erb :home
end
 

# CREATE routes

# 1. Show the blank form to be filled out
get '/animals/new' do
  erb :new
end

# 2. Form submits to here with a POST request
post '/animals' do
  #
  # sql = "INSERT INTO animals (name, species, description, roundness, alive, age, image_url)
  #   VALUES (
  #     '#{ params[:name] }',
  #     '#{ params[:species] }',
  #     '#{ params[:description] }',
  #      #{ params[:roundness] },
  #      #{ params[:alive] },
  #      #{ params[:age]},
  #     '#{ params[:image_url]}'
  #   );"
  #
  #   # execute the query and ignore the result
  #   db_query sql

  Animal.create(
    name: params[:name],
    species: params[:species],
    description: params[:description],
    roundness: params[:roundness],
    alive: params[:alive],
    age: params[:age],
    image_url: params[:image_url]
  )

    # redirect to the index of animals - from there we
    # can see the animal was added; and it also prevents
    # a reload from re-inserting this animal to the DB
    redirect '/animals'
end


# READ routes

# 1. Index of all animals in table
get '/animals' do
  # @results = db_query "SELECT * FROM animals;"
  @results = Animal.all

  erb :index
end

# 2. Details page for a single animal (row)
get '/animals/:id' do

  # @animal = db_query "SELECT * FROM animals WHERE id = #{ params[:id] } ;"
  # We know there's only one row when we query by ID,
  # so just grab the first row from the array of results
  # @animal = @animal.first
  @animal = Animal.find params[:id]

  erb :show
end


# UPDATE routes

# 1. Show pre-filled form
get '/animals/:id/edit' do

  # We need to get the details of the animal we're editing
  # so we can pre-fill the form with those details
  # @animal = db_query "SELECT * FROM animals WHERE id = #{ params[:id] } ;"
  # @animal = @animal.first
  @animal = Animal.find params[:id]

  erb :edit
end

# 2. Form submit, update the row
post '/animals/:id' do

  # sql = "UPDATE animals SET
  #     name        = '#{ params[:name] }',
  #     species     = '#{ params[:species] }',
  #     description = '#{ params[:description] }',
  #     roundness   =  #{ params[:roundness] },
  #     alive       =  #{ params[:alive] },
  #     age         =  #{ params[:age]},
  #     image_url   = '#{ params[:image_url]}'
  #   WHERE id = #{ params[:id] };"
  #
  #   # execute the query and ignore the result
  #   db_query sql

  animal = Animal.find params[:id]
  animal.update(
    name: params[:name],
    species: params[:species],
    description: params[:description],
    roundness: params[:roundness],
    alive: params[:alive],
    age: params[:age],
    image_url: params[:image_url]
  )

  redirect "/animals/#{ params[:id] }"
end


# DELETE route
get "/animals/:id/delete" do
  # db_query "DELETE FROM animals WHERE id = #{ params[:id] }"
  Animal.destroy params[:id]

  # No template to show, redirect to the index
  redirect "/animals"
end
