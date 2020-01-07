
class Planet < ApplicationRecord

  # All the behaviour of this class is inherited from ApplicationRecord
  # (which itself inherits from ActiveRecord)

  # Now we can write code like 'Planet.all' to get every row in the
  # planets table. Because of the class name, rails knows to look
  # in the 'planets' table.

end
