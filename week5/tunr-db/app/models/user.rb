class User < ApplicationRecord
  has_many :mixtapes

  # By using 'has_secure_password', ActiveRecord will expect your
  # 'users' table to have a 'password_digest' column, for storing
  # the encrypted version of the password for a user - this requires
  # the 'bcrypt' gem to be in our Gemfile.
  #
  # When we now create a user via
  #   User.create ..., password: 'chicken'
  # the plaintext password will be encrypted on the fly and stored
  # in the 'password_digest'

  has_secure_password

  # Specify that the email field must be present when creating a user...
  # ... and also unique!
  validates :email, presence: true, uniqueness: true

  validates :name, presence: true

end
