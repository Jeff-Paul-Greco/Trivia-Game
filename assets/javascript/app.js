
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

var round = 0;
var right = 0;
var incorrect = 0;
var timeout = 0;
var counter = 10;
var gameRunning = false;

function roundBegin(i) {

    console.log(round);

    if (round >= 5) {
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

        var intervalId = null;
        intervalId = setInterval(countdown, 1000);


        function countdown() {

            if (counter === 0) {
                gameRunning = false;
                clearInterval(intervalId);
                counter = 10;
                $("#time").html("Time's Up!");
                $("#question").html("The Correct Answer was: " + correctAnswer[i]);
                $(".buttons").hide();
                timeout++;
                round++;
                wait();
            } else if (gameRunning = true) {
                counter--;
                $("#time").html("Time Remaining: " + counter);
            }
        }
    };

    $(".buttons").on("click", function () {
        
        gameRunning = false;
        clearInterval(intervalId);
        var currentAnswer = ($(this).attr("answer-number"));
        currentAnswer = parseInt(currentAnswer);

        if (currentAnswer === currentCorrect) {

            counter = 10;
            $("#question").html("Correct!");
            $("#time").hide();
            $(".buttons").hide();
            right++;
            round++;
            wait();

        } else {

            counter = 10;
            $("#time").html("Wrong!");
            $("#question").html("The Correct Answer was: " + correctAnswer[i]);
            $(".buttons").hide();
            incorrect++;
            round++;
            wait();
        };

    });
};





function wait() {
    setTimeout(function () {

        roundBegin(round);

    }, 5000);
};


function endGame() {
    $("#time").html("Results!");
    $("#question").html("correct: " + right + "<br>" + "incorrect: " + incorrect + "<br>" + "timeouts: " + timeout);
    $("#answers").empty();
    $("#start").show();
    round = 0;
    return
}

function clickStart() {

    right = 0;
    incorrect = 0;
    timeout = 0;
    counter = 10;

    roundBegin(0);

};

$("#start").click(function () {

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




