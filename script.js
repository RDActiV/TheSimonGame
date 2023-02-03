setTimeout(function(){$('#welcomeScreen').fadeOut(500);},1500);

const buttonColors = ["red","blue","green","yellow"];
const gamePattern = [];
const userClickedPattern =[];
var userChosenColor;
var level = 0;
var executed = false;
$('#closeBtn').click(function(){
    $('#overlay').css("display","none");
    $('#popup').fadeOut(300);
});

$(document).one('keypress',function(event){
    nextSequence();
})


function nextSequence(){
    $('h1').text("Level "+ (level+1));
    var randColor = buttonColors[Math.floor(Math.random(4)*4)]

    gamePattern.push(randColor);
    var randChooseColor = "#"+randColor;
    let beat = new Audio('sounds/'+randColor+'.mp3');
    beat.play();
    userClickedPattern.length = 0;
    
    $(randChooseColor).fadeOut(100);
    $(randChooseColor).fadeIn(100);
    level++;
    executed = true;
    
}

$(".btn").click(function(){
    if(executed){
        userChosenColor = $(this).attr('id');
        userClickedPattern.push(userChosenColor);
        let beat = new Audio('sounds/'+userChosenColor+'.mp3');
        beat.play();
        animatePress("#"+userChosenColor);
        checkAnswer(userClickedPattern.length-1)
    }

})

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    },100);
}

 function checkAnswer(currLevel){
    if(userClickedPattern[currLevel] === gamePattern[currLevel]){
        if(currLevel === (level-1)){
            setTimeout(nextSequence,1000);
        }
    }else{
        $('h1').text( "Game Over, Press Any Key to Restart");
        let beat = new Audio('sounds/wrong.mp3');
        $("body").addClass("game-over");
        executed = false;
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $(document).one('keypress',function(event){
            startOver();
        })
    }
    
 }

 function startOver(){
    level = 0;
    executed = false;
    gamePattern.length = 0;
    nextSequence();
 }