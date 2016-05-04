// Global Variables
var mCurrentWinner;
var mMinTicketNumber = 25;
var mMaxTicketNumber = 100;


/// ----------------------------------------------------------
/// Calculate next winner number
/// ----------------------------------------------------------
function getNextWinner(min, max) 
{
   var nextWinner = Math.floor(Math.random() * (max-min+1)) + min
   return nextWinner;
}
		

/// ----------------------------------------------------------
/// Read all raffle data from the HTML components
/// ----------------------------------------------------------
function readRaffleDataFromUI () 
{
    mMinTicketNumber = parseInt(document.getElementById("first_number").value);
    mMaxTicketNumber = parseInt(document.getElementById("last_number").value);
}

/// ----------------------------------------------------------
/// Display the next  all raffle data from the HTML components
/// ----------------------------------------------------------
function showWinnerNumber (winnerNumber) 
{
    document.getElementById("winner_number").value = winnerNumber;
}


/// ----------------------------------------------------------
/// Main function
/// ----------------------------------------------------------
function startRaffle () {
    // init
    readRaffleDataFromUI();
    
    // calculate next winner
    mCurrentWinner = getNextWinner(mMinTicketNumber, mMaxTicketNumber);
    
    // show next winner
    showWinnerNumber(mCurrentWinner);
}