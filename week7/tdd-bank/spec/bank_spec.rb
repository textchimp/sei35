
require_relative '../lib/bank' # this is the app code we are actually testing

# Now we start writing tests using the DSL of RSpec

describe Bank do

  # This code will run before every example (every
  # 'it' block) in this describe block, guaranteeing
  # that we have an instance of the Bank class ready
  # to test, in a variable called 'bank'
  # i.e. We have extracted the 'Arrange/Act' step
  # from the example blocks, making them DRYer
  let( :bank ){  Bank.new 'GA Bank' }

  describe '.new' do
    # This is the test section for making sure that
    # we can actually create a new instance of our
    # Bank class, using Bank.new()

    # An 'example': test a single specific feature or
    # aspect of the code
    it 'creates a new Bank object' do
      expect( bank ).to_not be nil   # Assert
      expect( bank ).to be_a Bank    # Assert
    end

    it 'assigns a name to the bank' do
      expect( bank.name ).to eq 'GA Bank' # Assert
    end


  end  # .new


  describe '#create_account' do

    it 'creates an account for some specific person' do
      bank.create_account( 'Craigsy', 200 )
      # Assert: is the result what we expected?
      expect( bank.accounts['Craigsy'] ).to eq 200
    end

    it 'creates an account with a zero default balance when no starting balance is specified' do
      bank.create_account( 'Craigsy' )
      expect( bank.accounts['Craigsy'] ).to eq 0
    end

  end #   #create_account


  describe '#deposit' do

    it 'deposits the correct amount into the specified account' do
      # Arrange
      bank.create_account( 'Craigsy', 100 )
      # Act
      bank.deposit( 'Craigsy', 200 )
      # Assert
      expect( bank.accounts['Craigsy'] ).to eq 300
    end

    it 'only changes the balance when the deposit amount is greater than zero' do
      # Arrange
      bank.create_account( 'Craigsy', 100 )
      # Act
      bank.deposit( 'Craigsy', -555 )
      # Assert
      expect( bank.accounts['Craigsy'] ).to eq 100
    end

  end #   #deposit


  describe '#withdraw' do

    it 'withdraws the correct amount from the specified account' do
      bank.create_account( 'Jonesy', 100 )
      bank.withdraw( 'Jonesy', 50 )
      expect( bank.accounts['Jonesy'] ).to eq 50
    end

    it 'ignores withdrawals that exceed the account balance' do
      bank.create_account( 'Jonesy', 100 )
      bank.withdraw( 'Jonesy', 200 )
      expect( bank.accounts['Jonesy'] ).to eq 100
    end

  end #   #withdraw


end # describe
