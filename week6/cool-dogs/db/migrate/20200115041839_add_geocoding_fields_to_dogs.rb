class AddGeocodingFieldsToDogs < ActiveRecord::Migration[5.2]
  def change
    add_column :dogs, :address, :text
    add_column :dogs, :latitude, :float
    add_column :dogs, :longitude, :float
  end
end
