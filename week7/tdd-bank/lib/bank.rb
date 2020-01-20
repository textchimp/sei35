
class Bank

  attr_reader :name, :accounts  # write the getter for us

  # def name
  #   @name
  # end

  def initialize( name )
    @name = name
    @accounts = {}   # Initialise accounts to an empty hash
  end

  def create_account( name, balance=0 )
    @accounts[ name ] = balance
  end

  def deposit( account_name, amount )
    return unless amount > 0
    @accounts[ account_name ] += amount
  end

  def withdraw( account_name, amount )
    return unless @accounts[ account_name ] >= amount
    @accounts[ account_name ] -= amount
  end

end # Bank
