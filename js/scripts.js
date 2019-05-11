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
};
//function that dictates what is to happen when the dice is rolled

Player.prototype.roll= function(){
  var randomNumber= Math.floor((Math.random()* 6)+ 1);
  this.diceRoll = randomNumber;
  activePlayer();

  if (randomNumber===1){
    this.turnScore= 0;
    this.diceRoll= 1;
    if(this.active === player1.active) {
      player1.active = false;
      player2.active = true;
      $(".firstPlayer").children().prop("disabled",true);
      $(".secondPlayer").addClass("disableGamingField");
      $(".secondPlayer").children().prop("disabled",false);
      $(".secondPlayer").removeClass("disableGamingField");
    }
    else if(this.active===player2.active){
      player2.active= false;
      player1.active= true;
      $(".secondPlayer").children().prop("disabled",true);
      $(".secondPlayer").addClass("disableGamingField")
      $(".firstPlayer").children().prop("disabled"false);
      $(".firstPlayer").removeClass("disableGamingField")
    }
    else{
      console.log("This game is not working");
    }
    return alert("Oooop, you got a 1. It is your partner's turn");
  };
  else{
    this.turnScore +=randomNumber;
  };
  return this.diceRoll;
}
// When a player holds
Player.prototype.hold() = function () {
  activePlayer();
  this.totalScore += this.turnScore;
  if(this.totalScore >= 100){
    alert("Game Over. You have won!!!!");
    resetFields();
    alert("To play with a new partner click new game.")
  }
  else{
    return false;
  }
  console.log("the turn total is: " + this.turnScore);
  return this.overallScore;
};


// front End logic
$("#formFields").submit(function(event){
  event.preventDefault();
  $("form").hide();
  $(".startNewGame").show();
  $(".startNewGame").click(function(){
    $("form").show();
    $(".playingSection").hide();
    $(".startNewGame").hide();
    resetFields();
  });
  $("#playingSection").show();
  var user1 = $("#nameplayer1").val();
  var user2 = $("#nameplayer2").val();

  player1 = new Player(user1);
  player2 = new Player(user2);

  $(".nameofplayer1Output").text(player1.name);
  $(".nameofplayer2Output").text(player2.name);
  resetFields();
});
$("user1roll").click(function(event){
  event.preventDefault();
  player1.active = true;
  player2.active = false;
  player1.roll();
  $(".diceRoll1").text(player1.diceRoll);
  $(".turnScore1").text(player1.turnScore);
});
