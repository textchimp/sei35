class Pear < Fruit
  # STI: Single Table Inheritance in Rails:
  # create one class that actually corresponds to a
  # database table, and child classes that inherit
  # from that class - all their entries are stored
  # in the parent class' table; in this example, 'fruits'

  validates :name, uniqueness: true

  def squishy?
    true   # different answer to the base class method
  end

end
