$(document).ready(function(){

    /////////////////
    //  variables  //
    /////////////////

    var allQuestions = [{"question":"Do all your developers love Microsoft and all of it's products?","choices":["yes","no"],"correctAnswer":"no"},
        {"question":"What Operating System does your company develop on?","choices":["Windows","OSx","Linux"],"correctAnswer":"OSx"},
        {"question":"What programming language do you use for the server-side?","choices":["PHP","Ruby","Perl","Python","Node.js"],"correctAnswer":"ruby"},
        {"question":"Would you be willing to hire a junior/entry level front end developer?","choices":["yes","no"],"correctAnswer":"yes"},
        {"question":"What kind of attire do your employees wear?","choices":["Formal","Casual","Clean clothes will do"],"correctAnswer":"casual"}
    ];
    var qCount = 0, points = 0, length = allQuestions.length, correct = [];

    /////////////////
    //  functions  //
    /////////////////

    var set = function() {
        // display settings set up for javascript disabled users
        $('header').css({'display':'block'});
        $('#main').css({'display':'block'});
        $('#noscript').css({'display':'none'});
        // clear all questions within .question and create all new #question divs within .question
        questions();
        // hide all elements other than #intro and .question
        $('.content').not($('#intro')).hide();
        $('.question').children().hide();
        $('#intro, .question').show();

        // reset variables to starting values
        qCount = 0;
        points = 0;
        correct = [];
    };


    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var questions = function() {
        // clear all, if any, questions within .question
        $('.question').html('');
        $.each(allQuestions, function(i){
            // create html for individual questions and choices
            var html = "<form id = question_" + (i+1) + "><p>" + allQuestions[i].question + "</p>";
            // loop through and create radio buttons for each choice
            for(var x = 0 ; x < allQuestions[i].choices.length; x++){
                html += "<input id='choice" + (i+1) + "_" + (x+1) + "' type='radio' name='radio" + (i+1) + "' class='radio' value='" + allQuestions[i].choices[x] + "' >";
                html += "<label for='choice" + (i+1) + "_" + (x+1) + "'>" + allQuestions[i].choices[x].capitalize() + "</label><br>";
            }
            //make a previous button only if there is a question to go back to
            if (i > 0) {html += "<div class='previous'>Previous</div><br>";}
            html += "<div class='next'>Next</div></form>";
            // show questions and insert html for next individual question
            $('.question').append(html);
        });
    };

    var answer = function(i) {
        var checked = $('#question_'+ (i) +' input:checked');
        // make sure answer is checked before moving to next question
        if(checked.length !== 0){
            // submit a 1 or 0 into the correct array if answer is correct
            if (checked.val().toLowerCase() === allQuestions[i-1].correctAnswer.toLowerCase() ){
                correct[i-1] = 1;
            } else {
                correct[i-1] = 0;
            }
        } else {
            return false;
        }
    };


    var score = function() {
        // add all the elements within correct array
        $.each(correct,function() {
            points += this;
        });
        // get percentage of correct answers divided by total questions
        points = (points/length)*100;
        return points;
    };

    var begin = function() {
        $('#intro').fadeOut('slow',function(){
            $('#question_1').fadeIn('slow');
        });
        qCount += 1;
    };

    // fade out last question and display score results within #score div
    var end = function(i) {
        $('#question_' + (i)).fadeOut(function(){
            $('.content').not($('#score')).hide();
            $('#score').show();
            $('#final').empty().append(score() + '%');
            $('#score').fadeIn();
        });
    };

    // fade out currect question and fade in next question
    var forward = function(i) {
        $('#question_' + (i)).fadeOut(function(){
            $('#question_' + (i+1)).fadeIn();
        });
        qCount += 1;
    };

    // fade out currect question and fade in previous question
    var backward = function(i){
        $('#question_' + (i)).fadeOut(function(){
            $('#question_' + (i-1)).fadeIn();
        });
        qCount -= 1;
    };

    var next = function(i) {
        if(i === 0) {
                begin();
        } else if (answer(i) !== false){
            if(i === (length)){
                end(i);
            } else {
                forward(i);
            }
        }

    };


    ////////////
    //  main  //
    ////////////

    set();

    $('.start').click(function(){
        next(qCount);
    });

    $('#retry').click(function(){
        set();
    });

    $('.question').on("click",".next",function() {
        next(qCount);
        answer(qCount);
    });
    $('.question').on("click",".previous",function() {
        backward(qCount);
        answer(qCount);
    });


});