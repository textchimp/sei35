/*

In this homework, you'll create a basic bank in Javascript. The bank has many accounts and the following capabilities that you need to write.

Bank
There is only one bank. This bank has an array of accounts. The bank needs a method that will return the total sum of money in the accounts. It also needs an addAccount method that will enroll a new account at the bank and add it to the array of accounts. There is no need to create additional functions of the bank to delete accounts, etc.

The bank has many accounts. Accounts should be objects that all share a set of common functionality.

Accounts
Accounts have a current balance and owner's name. You should be able to deposit or withdraw from an account to change the balance.

There is no need to write a user interface. Make sure functions return values -- you may also have your functions console.log() values to help you see your code working.

You should write a basic story through a series of JavaScript commands that shows that the methods do indeed work as expected: add some accounts, show the total balance, make some deposits and withdrawals, show the new total balance.

Tips
Don't overthink this. Shorter code is probably the answer.

Bonus
Ensure that the accounts cannot have negative values.
Write a 'transfer' on the bank that allows you to transfer amounts between two accounts.
*/

const bank = {

  // An array of objects
  // It would be much easier to access the accounts if they were an an object,
  // indexed by name, with the balance as the value (no looping to find accounts):
  //
  // accounts: {
  //   'Josh': 100.0,
  //   'Luke': 50.0,
  //   'Irene': 1000.0
  // }
  accounts: [
    { name: 'Josh',  balance: 100.0  },
    { name: 'Luke',  balance: 50.0   },
    { name: 'Irene', balance: 1000.0 },
  ],

  totalBalances: function(){
    let total = 0;

    // Loop over the accounts (which is a normal array, so use a normal for loop)
    for( let i = 0; i < this.accounts.length; i++ ){
      const currentAccount = this.accounts[ i ];  // get the account from the array
      total += currentAccount.balance;  // add its balance to a running total
    }

    return total;
  }, // totalBalances(),

  // This helper function takes a name string argument, and loops through the
  // accounts array, returning the account object it finds whose name matches
  // the accountName argument. By writing this, we don't have to do all this
  // looping in every deposit/withdraw/transfer - we just use this function
  // to do that work for us.
  getAccountByName: function( accountName ){

    for( let i = 0; i < this.accounts.length; i++ ){
      const currentAccount = this.accounts[ i ];
      if( accountName === currentAccount.name ){
        return currentAccount;  // Return the whole account if we find it
      }
    } // for

    // If we get to this line, it means we didn't find a matching account
    // anywhere in the accounts array - or we would have returned earlier.
    console.log('No matching account found.');

    // Return an empty (falsey) value to indiciate failure; we need this
    // if we want other code which uses this function to know whether an
    // account was actually found or not.
    return null;

  }, // getAccountByName()


  deposit: function( accountName, amount ){

    // Find the account object from the array with a matching name
    const account = this.getAccountByName( accountName );
    if( account !== null ){
      // We found a valid account with that name
      account.balance += amount;
      console.log(`Deposit of ${ amount } to account '${ accountName }' successful.`);
      console.log(`New balance: ${ account.balance }`);
      return account.balance;  // return some useful information
    }

    // WE DON'T NEED ALL THIS LOOPING HERE ANY MORE BECAUSE OF this.getAccountByName()
    //
    // for( let i = 0; i < this.accounts.length; i++ ){
    //   const currentAccount = this.accounts[ i ];
    //
    //   if( accountName === currentAccount.name ){
    //     // Found the matching account! Now make the deposit
    //     currentAccount.balance += amount;  // Actually add the amount
    //     console.log(`Deposit of ${ amount } to account '${ accountName }' successful.`);
    //     console.log(`New balance: ${ currentAccount.balance }`);
    //     return currentAccount.balance;  // stop looking, and return some useful information
    //   }
    //
    // } // for

  }, // deposit()

  withdraw: function( accountName, amount ){

    const account = this.getAccountByName( accountName );
    if( account !== null ){

      // Overdraft checking! You can only withdraw an amount, if withdrawing it
      // leaves you with 0 or more dollars in your account (i.e. no negative values)
      if( account.balance - amount >= 0 ){

        account.balance -= amount;
        console.log(`Withdrawal of ${ amount } to account '${ accountName }' successful.`);
        console.log(`New balance: ${ account.balance }`);
        return account.balance;  // return some useful information

      } else {
        // The withdrawal would have been an overdraw
        console.log(`Insufficient funds for withdrawal of ${amount}`);
        return false; // Indicate that the withdrawal was not possible
      }

    } // valid account found

    // WE DON'T NEED ALL THIS LOOPING HERE ANY MORE BECAUSE OF this.getAccountByName()
    //
    // Find the account object from the array with a matching name
    // for( let i = 0; i < this.accounts.length; i++ ){
    //
    //   const currentAccount = this.accounts[ i ];
    //
    //   console.log(currentAccount.name);
    //
    //   if( accountName === currentAccount.name ){
    //     // Found the matching account! Now make the deposit
    //
    //     currentAccount.balance -= amount;  // Actually add the amount
    //
    //     console.log(`Withdrawal of ${ amount } to account '${ accountName }' successful.`);
    //     console.log(`New balance: ${ currentAccount.balance }`);
    //
    //     return currentAccount.balance;  // stop looking, and return some useful information
    //   }
    //
    // } // for
    //
  }, // withdraw()

  transfer: function( fromAccountName, toAccountName, amount ){

    // 1. Find 'from' account
    // 2. Find 'to' account
    //    (but if either is not found, cancel the transfer, print error)
    // 3. Withdraw from the 'from' account, deposit in to the 'to' account
    //    .... why not use the existing methods to do this?
    //    --- BUT check if the withdraw worked first! what did this.withdraw() return?
    //        This is why we need this.withdraw() to return a falsey value when it fails!

  }

};

bank.deposit('Josh', 100);  // Josh should now have 200
bank.withdraw('Josh', 150);  // Sorry... back to 50
bank.withdraw('Josh', 200); // This should fail with an 'Insufficient funds' error
