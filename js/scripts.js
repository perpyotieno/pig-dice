var player1, player2;
// constructor function for player
function Player(name,diceRoll,turnScore,totalScore,active){
  this.name= name;
  this.diceRoll= 0;
  this.turnScore=0;
  this.totalScore=0;
  this.active= active;
}
// function to make the gaming area for each player active or inactive depending on their turn
function activePlayer(){
  if(player1.active===true && player2.active===false){
    $(".firstPlayer").children().prop("disabled",false);
    $(".firstPlayer").removeClass("disableGamingField");
    $(".secondPlayer").children().prop("disabled",true);
    $(".secondPlayer").addClass("disableGamingField");
  }
  else{
    $(".firstPlayer").children().prop("disabled",true);
    $(".firstPlayer").addClass("disableGamingField");
    $("secondPlayer").children().prop("disabled",false);
    $(".secondPlayer").removeClass("disableGamingField");
  }
}
