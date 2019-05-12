//user interface logic
$(document).ready(function(){

$(".trial").hover(function(){
  $(".crazy").show();
});

  $(".playButton").click(function(){
    $(".playGame").show();
    $(".trial ").hide();
  });
  $("#formFields").submit(function(event){
event.preventDefault();
    $(".playingSection").show();
    $(".trial").hide();
    $(".forms").hide();
    $(".playGame").hide();
  });

  $(".startNewGame").click(function(){
  $(".forms").show();
  $(".playingSection").hide();
  resetFields();
 });


$("#formFields").submit(function (event) {
        event.preventDefault();
        $(".forms").hide();
        $(".startNewGame").show();
        $(".startNewGame").click(function () {
            $(".forms").show();
            $('#try').hide();
            $(".startNewGame").hide();
            resetFields();
        });
        $('#try').show();
        var user1 = $("#nameplayer1").val();
          var user2 = $("#nameplayer2").val();
        player1 = new Player(user1);
         player2 = new Player(user2);
        $(".nameofplayer1Output").text(player1.name);
        $(".nameofplayer2Output").text(player2.name);
        resetFields();
        });
      });

$(".user1roll").click(function(event){
        event.preventDefault();
        player1.active = true;
        player2.active = false;
        player1.roll();
        $(".diceRoll1").text(player1.diceRoll);
        $(".turnScore1").text(player1.turnScore);
    });

$(".user2roll").click(function (event) {
        event.preventDefault();
        player2.active = true;
        player1.active = false;
        player2.roll();
        $(".diceRoll2").text(player2.diceRoll);
        $(".turnScore2").text(player2.turnScore);
    });
   $(".user1hold").click(function (event) {
       event.preventDefault();

       player1.active = false;
       player2.active = true;
       player1.hold();
       $(".totalScore1").text(player1.totalScore);
       player1.diceRoll = 0;
       player1.turnScore = 0;
       $(".diceRoll1").text(player1.diceRoll);
       $(".turnScore1").text(player1.turnScore);
   });

$(".user2hold").click(function (event) {
    event.preventDefault();
    player2.active = false;
    player1.active = true;
    player2.hold();
    $(".totalScore2").text(player2.totalScore);
    player2.diceRoll = 0;
    player2.turnScore = 0;
    $(".diceRoll2").text(player2.diceRoll);
    $(".turnScore2").text(player2.turnScore);
});
 var player1, player2;

 //Back-End Logic
 function Player(name,diceRoll,turnScore,totalScore,active) {
     this.name = name;
     this.diceRoll = 0;
     this.turnScore=0;
     this.totalScore=0;
     this.active = active;
 }

function activePlayer(){
    if (player1.active === true && player2.active === false) {
        $(".firstPlayer").children().prop("disabled",false);
        $(".firstPlayer").removeClass("disableGamingField");
        $(".secondPlayer").children().prop("disabled",true);
        $(".secondPlayer").addClass("disableGamingField");
    } else {
        $(".firstPlayer").children().prop("disabled",true);
        $(".firstPlayer").addClass("disableGamingField");
        $("secondPlayer").children().prop("disabled",false);
        $("secondPlayer").removeClass("disableGamingField");
    }
};
Player.prototype.roll = function () {
    var randomNumber = Math.floor((Math.random() * 6) + 1);
    this.diceRoll = randomNumber;
    activePlayer();

if (randomNumber===1) {
        this.turnScore = 0;
        this.diceRoll = 1;
        if (this.active === player1.active) {
            player1.active = false;
            player2.active = true;
            $(".firstPlayer").children().prop('disabled', true);
            $(".firstPlayer").addClass("disableGamingField");
            $(".secondPlayer").children().prop('disabled', false);
            $(".secondPlayer").removeClass("disableGamingField");
          }

else if (this.active === player2.active) {
            player2.active = false;
            player1.active = true;
            $(".secondPlayer").children().prop('disabled', true);
            $(".secondPlayer").addClass("disableGamingField");
            $(".firstPlayer").children().prop('disabled', false);
            $(".firstPlayer").removeClass("disableGamingField");
        }

else {
            console.log("This game is not working");
        }
        return alert("Oooops, you got a 1. It is your partner's turn");
    } else {
        this.turnScore +=randomNumber;
    };
    return this.diceRoll;
};

Player.prototype.hold = function () {
    activePlayer();
    this.totalScore += this.turnScore;
    if (this.totalScore >= 100) {
        alert("Game Over. You have won!!!!");
        resetFields();
        alert("To play with a new partner click new game.")

    } else {
        return false;
    }
    console.log('the turn total is: ' + this.turnScore);
    return this.totalScore;
};

function resetFields() {
    $("input#nameplayer1").val("");
    $("input#nameplayer2").val("");
    $('.firstPlayer').children().prop('disabled', false);
    $('.secondPlayer').children().prop('disabled', false);
    $('.firstPlayer').removeClass('disableGamingField');
    $('.secondPlayer').removeClass('disableGamingField');
    var thePlayers = [player1, player2];
    thePlayers.forEach(function (player) {
        player.diceRoll = 0;
        player.turnScore = 0;
        player.totalScore = 0;
    })
    var outputs = [$('.diceRoll1'), $('.turnScore1'), $('.totalScore1'), $('.diceRoll2'), $('.turnScore2'), $('.totalScore2')];
    outputs.forEach(function (output) {
        output.text(0);
    })

};
