// Global Variables
var mMinTicketNumber = 25;
var mMaxTicketNumber = 100;
var mGiftlist = []; // Array of strings
var mWinnersNumbers = []; // Array of ints
var mWinnersList = []; // Array of ints
var mCurrentWinnterId = -1;


/// ----------------------------------------------------------
/// Calculate next winner number
/// ----------------------------------------------------------
function getNextWinner(min, max, currentWinnersList) 
{
   var nextWinnerCandidate = Math.floor(Math.random() * (max-min+1)) + min
   alert(nextWinnerCandidate);
   // Avoid repetitions
   while (mWinnersList.indexOf(nextWinnerCandidate)!=-1)
       nextWinnerCandidate = Math.floor(Math.random() * (max-min+1)) + min
       
   return nextWinnerCandidate;
}
		

/// ----------------------------------------------------------
/// Reset all global variables to use
/// ----------------------------------------------------------
function resetData () 
{
    mMinTicketNumber = 0;
    mMaxTicketNumber = 0; 
    mGiftlist= [];
    mWinnersNumbers= [];
    mWinnersList= [];
    mCurrentWinnerId = -1;
}


/// ----------------------------------------------------------
/// Read all raffle data from the HTML components
/// ----------------------------------------------------------
function readDataFromUI () {
    mWinnersNumbers= [];
    
    mMinTicketNumber = parseInt(document.getElementById("first_number").value);
    mMaxTicketNumber = parseInt(document.getElementById("last_number").value);
    giftListRaw = document.getElementById('gift_list').value;
    mGiftlist = giftListRaw.split("\n");
    alert(mGiftlist);
    
    
}


/// ----------------------------------------------------------
/// Display the next  all raffle data from the HTML components
/// ----------------------------------------------------------
function displayWinner (winnerIndex) {
    document.getElementById("winner_number").value = mWinnersNumbers[winnerIndex];
    setTimeout(function(){
        winner_number.innerHTML = winnerNumber;
        document.getElementById("winner_gift").value = mGiftlist[winnerIndex];
    }, 500);
}




/// ----------------------------------------------------------
/// Generate winners and assign them to gifts
/// ----------------------------------------------------------
function generateListOfWinners (giftList) {
    for (var i=0; i< giftList.length; i++) {
        var winnerNumber = getNextWinner(mMinTicketNumber, mMaxTicketNumber);
        mWinnersList[i] = winnerNumber; 
    }
}



function setResultsVisibility (visible) {
    
  document.getElementById("result_div").style.display = (visible ? 'visible' : 'none');
}

     
/// ----------------------------------------------------------
/// Event handlers
/// ----------------------------------------------------------
function onStartRaffleButton () {
    
    // init
    resetData();
    readDataFromUI();
    
        
    // Generate list of winners for the gifts
    generateListOfWinners(mGiftlist);
    if (mWinnersList.length==0) {
        alert("You have not entered a list of gifts");
        return;
    }
        
    setResultsVisibility(true);
     
    // show the first winner
    mCurrentWinnerId = 0;
    displayWinner(mCurrentWinnerId);
}
         
         
function onNextWinnerButton () {
    if (mCurrentWinnerId<mWinnersList.length-1) {
        mCurrentWinnerId++;
        displayWinner(mCurrentWinnerId);
    }    
    else {
        // Reached the last winner
        alert("All gifts has been assigned!");
    }
}