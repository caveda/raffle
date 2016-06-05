// Global Variables
var mMinTicketNumber = 25;
var mMaxTicketNumber = 100;
var mGiftlist = []; // Array of strings
var mWinnersList = []; // Array of ints
var mCurrentWinnterId = -1;
var Odmeter;

/// ----------------------------------------------------------
/// Calculate next winner number
/// ----------------------------------------------------------
function getNextWinner(min, max, currentWinnersList) 
{
   var nextWinnerCandidate = Math.floor(Math.random() * (max-min+1)) + min
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
    mWinnersList= [];
    mCurrentWinnerId = -1;
    
}


function initializeOdometer () {
  Odmeter = new Odometer({
  el: winner_number,
  value: 333555,
  format: 'dd',
  theme: 'digital'
});

}


/// ----------------------------------------------------------
/// Remove empty elements from the array
/// ----------------------------------------------------------
function removeEmptyElements(stringArray) {
  var newArray = new Array();
  for (var i = 0; i < stringArray.length; i++) {
    if (stringArray[i]) {
      newArray.push(stringArray[i]);
    }
  }
  return newArray;
}


/// ----------------------------------------------------------
/// Read all raffle data from the HTML components
/// ----------------------------------------------------------
function readDataFromUI () {
    
    mMinTicketNumber = parseInt(document.getElementById("first_number").value);
    mMaxTicketNumber = parseInt(document.getElementById("last_number").value);
    giftListRaw = document.getElementById('gift_list').value;
    mGiftlist = giftListRaw.split("\n");
    mGiftlist = removeEmptyElements(mGiftlist);
}


/// ----------------------------------------------------------
/// Display the next  all raffle data from the HTML components
/// ----------------------------------------------------------
function displayWinner (winnerIndex) {
    document.getElementById("winner_number").value = mWinnersList[winnerIndex];
    setTimeout(function(){
        Odmeter.update(mWinnersList[winnerIndex]);
        document.getElementById("winner_gift").innerHTML = mGiftlist[winnerIndex];
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


function setRaffleConfigurationVisibility (visible) {
    
  document.getElementById("setup_div").style.display = (visible ? "block" : "none");
}


function setResultsVisibility (visible) {
    
  document.getElementById("result_div").style.display = (visible ? "block" : "none");
}

     
/// ----------------------------------------------------------
/// Event handlers
/// ----------------------------------------------------------
function onStartRaffleButton () {
    
    // init
    initializeOdometer();
    setResultsVisibility(false);
    setRaffleConfigurationVisibility(true);
    resetData();
    readDataFromUI();
    
        
    // Generate list of winners for the gifts
    generateListOfWinners(mGiftlist);
    if (mWinnersList.length==0) {
        alert("You have not entered a list of gifts");
        return;
    }
        
    setResultsVisibility(true);
    mCurrentWinnerId = 0;
    setRaffleConfigurationVisibility(false);
}
         
         
function onNextWinnerButton () {
    
    displayWinner(mCurrentWinnerId);
    if (mCurrentWinnerId<mWinnersList.length) {
        displayWinner(mCurrentWinnerId);
        mCurrentWinnerId++;
    }    
    else {
        // Reached the last winner
        alert("All gifts has been assigned!");
        setRaffleConfigurationVisibility(true);
        setResultsVisibility(false);
        
    }
}