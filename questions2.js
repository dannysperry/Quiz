$(document).ready(function(){

    /////////////////
    //  variables  //
    /////////////////

    var allQuestions = [{"question":"Do all your developers love Microsoft and all of it's products?","choices":["yes","no"],"correctAnswer":1},
                        {"question":"What Operating System does your company develop on?","choices":["Windows","OSx","Linux"],"correctAnswer":1},
                        {"question":"What programming language do you use for the server-side?","choices":["PHP","Ruby","Perl","Python","Node.js"],"correctAnswer":1},
                        {"question":"Would you be willing to hire a junior/entry level front end developer?","choices":["yes","no"],"correctAnswer":0},
                        {"question":"What kind of attire do your employees wear?","choices":["Formal","Casual","Clean clothes will do"],"correctAnswer":1}
                        ];
    var qCount = 0, points = 0, length = allQuestions.length, correct = [];

    /////////////////
    //  functions  //
    /////////////////

    var start = function() {
    $('header').css({'display':'block'});    // display settings
    $('#main').css({'display':'block'});     // set up for javascript
    $('#noscript').css({'display':'none'});  // disabled users

    $('.content').not($('#intro')).hide();
    $('#intro').show();
    points = 0;
    qCount = 0;
    correct = [];
    };

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var answer = function(i) {

        var checked = $('#question_'+ i +' input:checked');
        if(checked.length !== 0){
            if ($('#question_' + i + ' input:checked').val() === allQuestions[i-1].choices[allQuestions[i-1].correctAnswer] ){
                correct.push(1);
            } else {
                correct.push(0);
            }
        } else {
            return false;
        }
    };
    var question = function(i){
        // create html for individual questions and choices
        var html = "<form id = question_" + i + "><p>" + allQuestions[i-1].question + "</p>";
        // loop through and create radio buttons for each choice
        for(var x = 0 ; x < allQuestions[i-1].choices.length; x++){
            html += "<input id='choice" + (i) + "_" + (x+1) + "' type='radio' name='radio" + (i) + "' class='radio' value='" + allQuestions[i-1].choices[x] + "' >";
            html += "<label for='choice" + (i) + "_" + (x+1) + "'>" + allQuestions[i-1].choices[x].capitalize() + "</label><br>";
        }
        //make a previous button only if there is a question to go back to
        if (qCount > 1) {html += "<button class='previous'>Previous</button><br>";}
        html += "<button class='next'>Next</button></form>";
        // show questions, clear old question html inside it, and insert html for next individual question
        $('.question').show().empty().append(html);

        $('.next').click(function(e) {
            e.preventDefault();
            answer(i);
            next();
        });
        $('.previous').click(function(e) {
            e.preventDefault();
            previous();
        });
    };


    // get percentage of correct answers divided by total questions
    var score = function() {
        $.each(correct,function() {
            points += this;
        });
        points /= length;
        points *= 100;
        return points;
    };


    var results = function() {
        // stop showing questions and show results with score()
        if (qCount-1 ===  length) {
            $('.content').not($('#score')).hide();
            $('#score').show();
            $('#final').empty().append(score() + '%');
        }
    };

    var next = function() {
        if (qCount === 0) {
            qCount += 1;
            question(qCount);
        } else if ((qCount > 0) && (answer(qCount) !== false)) {
            qCount += 1;
            results();
            question(qCount);
        }

    };

    var previous = function() {
        qCount -= 1;
        question(qCount);
        correct.pop();
    };


    ////////////
    //  main  //
    ////////////

    start();

    $('.submit').click(function(){
        $('#intro').hide();
        next();
    });

    $('#retry').click(function(){
        start();
    });



});
