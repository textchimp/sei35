require 'rails_helper'

RSpec.describe Fruit, type: :model do
  # pending "why not add some examples to (or delete) #{__FILE__}"


  # Test associations using shoulda_matchers
  it { should belong_to(:shelf) }

  describe 'A Pear' do

    before do
      # set up test (Arrange)
      @shelf = Shelf.create name: 'watevz'
      @pear = Pear.create name: 'Nashi', shelf: @shelf
      # Get the data you need (Act)
      # puts 'pear:'
      # p @pear.errors
      @pear_retrieved = Pear.find @pear.id
    end

    it 'should create a valid fruit object' do
      # define/test expectations (Assert)
      expect( @pear_retrieved ).to_not be_nil
      expect( @pear_retrieved ).to eq @pear
    end

    it 'should remember its name' do
      expect( @pear_retrieved.name ).to eq 'Nashi'
    end


    it 'should remember its class via Single Table Inheritance' do
      pear = Fruit.find @pear.id
      expect( pear.class ).to eq Pear
      expect( pear ).to be_a Pear

      expect( pear.is_a? Fruit ).to be true
      expect( pear ).to be_a Fruit

      expect( pear.class.ancestors ).to include Fruit


    end

    it 'should be squishy' do
      expect( @pear_retrieved.squishy? ).to eq true
    end

    # Test validations on a model:

    it 'should be valid' do
      expect( @pear ).to be_valid
    end

    it 'should validate the uniqueness of the name' do
      pear_duplicate = Pear.create name: 'Nashi'
      expect( pear_duplicate ).to_not be_valid
    end


  end # Pear


end # Fruit
