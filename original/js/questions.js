$(document).ready(function() {

    ///////////////////////
    // Variable Declarations
    ///////////////////////
    var qCount = 0, points = 0, children = $('section').children(), l = $('.question').length, correctAnswers = ['no','osx','ruby','yes','clean'];


    ///////////////////////
    // Functions
    ///////////////////////
    var startAndReset = function() {
        $('header').css({'display':'block'});    // display settings
        $('#main').css({'display':'block'});     // set up for javascript
        $('#noscript').css({'display':'none'});  // disabled users
        $('.content').not($('#intro')).hide();
        $('#intro').show();
        $('.radio').prop('checked', false);
        points = 0;
        qCount = 0;
    };

    var moveForward = function(x) {
        $(children[x-1]).hide();
        $(children[x]).show();
    };

    var answer = function(i) {
        var checked = $('#question'+i+' input:radio:checked');
        if(checked.length !== 0){
            if (checked.val() === correctAnswers[i-1]) {
                points += 1;
            } else {
                points += 0;
            }
        } else {
            return false;
        }

    };

    var next = function() {
        if (qCount === 0){
            qCount += 1;
            moveForward(qCount);
        } else if ((qCount > 0) && (answer(qCount) !== false)) {
            qCount += 1;
            answer(qCount);
            moveForward(qCount);
        }
    };

    var score = function() {
        points /= l;
        $('#final').replaceWith("<p id='final'>" + points*100 + "%</p>");
    };

    ///////////////////////
    // Active function calls and event handlers
    ///////////////////////
    startAndReset();

    $(".submit").click(function(){
        if (qCount === (l)){
            next();
            score();
        } else {
            next();
        }
    });

    $('#retry').click(function(e){
        e.preventDefault();
        startAndReset();
    });

});




