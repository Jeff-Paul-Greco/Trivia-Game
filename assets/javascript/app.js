
var questions = {
    question: ["Which one of these weapons is from Mega Man 2?",
        "Which of these is not a Robot Master?",
        "Which game introduced the character of Proto Man?",
        "Which Mega Man game introduced Rush the dog?",
        "Which of these is not a Mega Man series character?"],
    answer1: ["Bubble Lead", "Yamato Man", "Mega Man 2", "Mega Man", "Bass"],
    answer2: ["Top Spin", "Dust Man", "Mega Man 3", "Mega Man 2", "Roll"],
    answer3: ["Gemini Laser", "Shock Man", "Mega Man 4", "Mega Man 3", "Dr. Light"],
    answer4: ["Magnet Missle", "Hard Man", "Mega Man 5", "Mega Man 4", "Dr. Dark"]
};

var gifs = ["assets/images/megaman.gif", "assets/images/megaman2.gif", "assets/images/megaman3.gif",
    "assets/images/megaman4.gif", "assets/images/megaman5.gif"];



var round = 0;
var right = 0;
var incorrect = 0;
var timeout = 0;
var counter = 10;
var gameRunning = false;
var intervalId = null;
var gifTrack = 0;



$("#start").unbind().click(function () {

    $("#question").css("margin-top", "3%")
    $("#startGif").hide();
    $("#startGif").css("padding-bottom", "0px");
    $("#img").css("display", "inline-block");
    $("#question").css("display", "inline-block");
    $("#answers").css("display", "inline");

    $("#start").hide();
    for (i = 0; i < questions.question.length - 1; i++) {

        var buttons = $("<li>");
        buttons.attr("answer-number", i)
        buttons.attr("class", "buttons");
        buttons.attr("id", "button" + [i]);
        $("#answers").append(buttons);
        var nextLine = $("<br>")
        $("#answers").append(nextLine);
    };
    clickStart();
});

function clickStart() {

    right = 0;
    incorrect = 0;
    timeout = 0;
    counter = 10;

    roundBegin(0);
    startTimer();

};

function startTimer() {

    if (!gameRunning) {
        intervalId = setInterval(countdown, 1000);
        gameRunning = true;
    }
}

function countdown() {
    counter--;
    $("#time").html("Time Remaining: " + counter);
}

function stop() {
    clearInterval(intervalId);
    gameRunning = false;
    counter = 10;
}


function roundBegin(i) {

    $("#img").hide();
    $("#img").attr("src", "");
    counter = 10;
    console.log(round);

    if (round === 5) {
        endGame();
    } else {

        $(".buttons").show();
        $("#time").show();
        $("#question").show();
        $("#question").html(questions.question[i]);
        $("#button0").html(questions.answer1[i]);
        $("#button1").html(questions.answer2[i]);
        $("#button2").html(questions.answer3[i]);
        $("#button3").html(questions.answer4[i]);
        $("#time").html("Time Remaining: " + counter);

        var correctAnswer = ["Bubble Lead", "Shock Man", "Mega Man 3", "Mega Man 3", "Dr. Dark"];
        var correctButton = [0, 2, 1, 2, 3];

        var currentCorrect = correctButton[i];

        startTimer();
        answerTime();

    };

    var x;

    function answerTime() {
        x = setTimeout(function () {

            stop();
            $("#time").html("Time's Up!");
            $("#img").show()
            $("#img").attr("src", gifs[gifTrack])
            $("#question").html("The Correct Answer was: " + correctAnswer[i]);
            $(".buttons").hide();
            timeout++;
            round++;
            gifTrack++;
            wait();

        }, 10000);
    };

    $(".buttons").unbind().click(function () {


        clearTimeout(x);
        var currentAnswer = ($(this).attr("answer-number"));
        currentAnswer = parseInt(currentAnswer);

        if (currentAnswer === currentCorrect) {

            stop();
            $("#question").html("Correct!");
            $("#img").show()
            $("#img").attr("src", gifs[gifTrack])
            $("#time").hide();
            $(".buttons").hide();
            right++;
            round++;
            gifTrack++;

        } else {

            stop();
            $("#time").html("Wrong!");
            $("#img").show()
            $("#img").attr("src", gifs[gifTrack])
            $("#question").html("The Correct Answer was: " + correctAnswer[i]);
            $(".buttons").hide();
            incorrect++;
            round++;
            gifTrack++;

        };
        wait();
    });


};



function wait() {
    setTimeout(function () {

        roundBegin(round);
        counter = 10;

    }, 5000);
};


function endGame() {
    $("#time").html("Results!");
    $("#question").css("margin-top", "0%")
    $("#question").html("correct: " + right + "<br>" + "incorrect: " + incorrect + "<br>" + "timeouts: " + timeout);
    $("#answers").empty();
    $("#start").show();
    $("#startGif").show();
    clearInterval(intervalId);
    gameRunning = false;
    round = 0;
    gifTrack = 0;
    return
}



