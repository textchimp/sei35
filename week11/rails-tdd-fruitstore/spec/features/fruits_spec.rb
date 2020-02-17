require 'rails_helper'

RSpec.describe Fruit, type: :feature do

  describe 'Load the #index page (/fruits)' do

    before do
      shelf = Shelf.create name: 'a shelf'
      3.times { |i| Fruit.create name: "Fruit number #{i}", shelf: shelf }

      visit fruits_path # load the /fruits page
    end

    it 'has the correct heading' do
      expect( page ).to have_css('div#heading > h1', text: 'Fruits of the World')
    end

    it 'lists the fruits from the DB' do
      expect( page ).to have_css('ul > li.item', text: 'Fruit number 1')
    end


  end # /fruits



end
