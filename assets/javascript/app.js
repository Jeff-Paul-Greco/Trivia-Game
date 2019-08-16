    
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
    
var round = 1;
var right = 0;
var incorrect = 0;
var timeout = 0;
var counter = 7;
var intervalId;




$("#start").on("click", function() {
    
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
    counter = 7;

    roundBegin(0);

};

function roundBegin(i) {

    $("#question").html(questions.question[i]);
    $("#button0").html(questions.answer1[i]);
    $("#button1").html(questions.answer2[i]);
    $("#button2").html(questions.answer3[i]);
    $("#button3").html(questions.answer4[i]);
    $("#time").html("Time Remaining: " + counter);


    var correct = [0, 2, 1, 2, 3];
    var currentCorrect = correct[i];
    counter = 7;
    var intervalId = setInterval(countdown, 1000);

    function countdown() {
        counter--;
        $("#time").html("Time Remaining: " + counter);


        

        $(".buttons").on("click", function(i) {
       
            var currentAnswer = ($(this).attr("answer-number"));
            currentAnswer = parseInt(currentAnswer);
            console.log(currentAnswer);
            console.log(currentCorrect);
    
            if (currentAnswer === currentCorrect) {
                console.log("Hello");
            }
          
            
        });

        if (counter == 0) {
            clearInterval(intervalId);
            timeout++;
            roundBegin(i++);
        }
    }

    




};


