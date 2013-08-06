		
    /////////////////////
    //  handlebars.js  //
    /////////////////////

		// each question is an object with in this array, the object must have the names "question", "choices", and "correctAnswer".
    // the correctAnswer value must be the same as the one of the choices.
		var allQuestions = {"questions":[
					{
						"question":"How many horns did Triceratops have?",
						"choices":[
							{"choice":"Two"},
							{"choice":"Three"},
							{"choice":"Four"},
							{"choice":"Five"}],
						"correctAnswer":"three"
					},{
						"question":"The name dinosaur means ‘terrible lizard’.",
						"choices":[
							{"choice":"True"},
							{"choice":"False"}],
						"correctAnswer":"true"
					},{
						"question":"Which came first, the Jurassic or Cretaceous Period?",
						"choices":[
							{"choice":"Jurassic"},
							{"choice":"Cretaceous"},
							{"choice":"Both aren't prehistoric periods"},
							{"choice":"Only one of those is a prehistoric period"}],
						"correctAnswer":"Jurassic"
					},{
						"question":"Was Diplodocus a carnivore or herbivore?",
						"choices":[
							{"choice":"Carnivore"},
							{"choice":"Herbivore"},
							{"choice":"Omnivore"}],
						"correctAnswer":"herbivore"
					},{
						"question":"Tyrannosaurus rex was the biggest dinosaur ever.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"false"
					},{
						"question":"Iguanodon was one of three dinosaurs that inspired the appearance of Godzilla.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"True"
					},
					{
						"question":"Did Theropods such as Allosaurus and Carnotaurus move on two legs or four?",
						"choices":[
						{"choice":"Two"},
						{"choice":"Four"}],
						"correctAnswer":"two"
					},
					{
						"question":"Apatosaurus is also widely known by what other name?",
						"choices":[
						{"choice":"Triceratops"},
						{"choice":"Brontosaurus"},
						{"choice":"It's only knows as apatosaurus"}],
						"correctAnswer":"brontosaurus"
					},
					{
						"question":"Most dinosaurs became extinct during an event that occurred 500 years ago.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"false"
					},
					{
						"question":"What type of dinosaur features on the logo of the Toronto based NBA basketball team?",
						"choices":[
						{"choice":"T-Rex"},
						{"choice":"Raptor"},
						{"choice":"Pterodactyl"}],
						"correctAnswer":"raptor"
					},
					{
						"question":"Dinosaur fossils have been found on every continent of Earth.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"true"
					},
					{
						"question":"What dinosaur themed book was turned into a blockbuster movie in 1993?",
						"choices":[
						{"choice":"Dinosaurs"},
						{"choice":"Jurassic Park"}],
						"correctAnswer":"jurassic park"
					},
					{
						"question":"Ankylosaurus featured hug plates of bone that acted as body armor.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"true"
					},
					{
						"question":"Did Sauropods such as Brachiosaurus and Diplodocus move on two legs or four?",
						"choices":[
						{"choice":"Two"},
						{"choice":"Four"},
						{"choice":"Sauropods swim"}],
						"correctAnswer":"four"
					},
					{
						"question":"Pentaceratops was the first dinosaur to be officially named.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"false"
					},
					{
						"question":"Which came first, the Jurassic or Triassic Period?",
						"choices":[
						{"choice":"Jarrasic"},
						{"choice":"Triassic"},
						{"choice":"Both aren't prehistoric periods"},
						{"choice":"Only one of those is a prehistoric period"}],
						"correctAnswer":"triassic"
					},
					{
						"question":"The US state of Colorado lists the Allosaurus as its state dinosaur.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"false"
					},
					{
						"question":"What weighed more, a fully grown Spinosaurus or Deinonychus?",
						"choices":[
						{"choice":"Spinosaurus"},
						{"choice":"Deinonychus"},
						{"choice":"Both aren't dinosaurs"},
						{"choice":"One isn't a dinosaur"}],
						"correctAnswer":"spinosaurus"
					},
					{
						"question":"A person who studies fossils and prehistoric life such as dinosaurs is known as a what?",
						"choices":[
						{"choice":"Paleontologist"},
						{"choice":"Philanthropist"},
						{"choice":"Archeologist"}],
						"correctAnswer":"paleontologist"
					},
					{
						"question":"Birds evolved from dinosaurs.",
						"choices":[
						{"choice":"True"},
						{"choice":"False"}],
						"correctAnswer":"true"
					}
    		]};

			//////////////////////////
	    //  Handlebars helpers  //
	    //////////////////////////	
		
			// conditional helper
			Handlebars.registerHelper("cond", function(lvalue, operator, rvalue, options) {
				if (arguments.length < 4) {
		        // Operator omitted, assuming "+"
		        options = rvalue;
		        rvalue = operator;
		        operator = "+";
		    }

		    lvalue = parseFloat(lvalue);
		    rvalue = parseFloat(rvalue);

		    return {
		        "+": lvalue + rvalue,
		        "-": lvalue - rvalue,
		        "*": lvalue * rvalue,
		        "/": lvalue / rvalue,
		        "%": lvalue % rvalue,
						">": lvalue > rvalue,
					 ">=": lvalue >= rvalue,
						"<": lvalue < rvalue,
					 "<=": lvalue <= rvalue,
					"===": lvalue === rvalue,
					 "==": lvalue == rvalue,
		    }[operator];
			});
			
			// if condition helper
			Handlebars.registerHelper('ifCond', function (left, operator, right, options) {
			    switch (operator) {
			        case '==':
			            return (left == right) ? options.fn(this) : options.inverse(this);
			            break;
			        case '===':
			            return (left === right) ? options.fn(this) : options.inverse(this);
			            break;
			        case '<':
			            return (left < right) ? options.fn(this) : options.inverse(this);
			            break;
			        case '<=':
			            return (left <= right) ? options.fn(this) : options.inverse(this);
			            break;
			        case '>':
			            return (left > right) ? options.fn(this) : options.inverse(this);
			            break;
			        case '>=':
			            return (left >= right) ? options.fn(this) : options.inverse(this);
			            break;
			        default:
			            return options.inverse(this)
			            break;
			    }
			    //return options.inverse(this);
			});
			
		
    /////////////////
    //  variables  //
    /////////////////
			
    var qCount = 0, points = 0, l = allQuestions.questions.length, correct = [];


    /////////////////
    //  functions  //
    /////////////////


		// set up function for beginning of page and page reset		
    var set = function() {
        // display settings set up for javascript disabled users
        $('header').css({'display':'block'});
        $('#main').css({'display':'block'});
        $('#noscript').css({'display':'none'});
        // hide all elements other than #INTRO and .QUESTION
        $('.content').not($('#intro')).hide();
        $('.question').children().hide();
        $('#intro, .question').show();
        // reset variables to starting values
        qCount = 0;
        points = 0;
        correct = [];
				$('.active').removeClass('active');
    };
		
		//////////////////////////////////
		//  old code before handlebars.js  //
		////////////////////////////////// 		
    // 
		// set up capitalization on strings
    // String.prototype.capitalize = function() {
    //         return this.charAt(0).toUpperCase() + this.slice(1);
    //     };
    // 
    // var questions = function() {
    //     // clear all, if any, questions within .QUESTION
    //     $('.question').html('');
    //     // create each question form and append to .QUESTION
    //     $.each(allQuestions, function(i){
    //         // create html for individual questions and choices
    //         var html = "<form id = question_" + (i+1) + "><p>" + allQuestions[i].question + "</p>";
    //         // loop through and create radio buttons for each choice
    //         for(var x = 0 ; x < allQuestions[i].choices.length; x++){
    //             html += "<input class='choice' id='choice" + (i+1) + "_" + (x+1) + "' type='radio' name='radio" + (i+1) + "' class='radio' value='" + allQuestions[i].choices[x] + "' >";
    //             html += "<label for='choice" + (i+1) + "_" + (x+1) + "'>" + allQuestions[i].choices[x].capitalize() + "</label><br>";
    //         }
    //         //make a previous button only if there is a question to go back to
    //         if (i > 0) {html += "<div class='previous'>Previous</div><br>";}
    //         html += "<div class='next'>Next</div></form>";
    //         // insert html for next individual question
    //         $('.question').append(html);
    //     });
    // };

    var answer = function(i) {
        var checked = $('#question_'+ (i) + ' .active');
        // client side validation: make sure a choice is checked before moving to next question
        if(checked.length !== 0){
            // submit a 1 or 0 into the CORRECT array if answer is correct
            if (checked.val().toLowerCase() === allQuestions.questions[i-1].correctAnswer.toLowerCase() ){
                correct[i-1] = 1;
            } else {
                correct[i-1] = 0;
            }
        } else {
            return false;
        }
    };

		

    var total = function() {
        // add all the elements within CORRECT array
        $.each(correct,function() {
            points += this;
        });
        // get percentage of correct answers divided by total questions
        points = (points/l)*100;
        return points.toFixed(2);
    };

    // fade out #INTRO and fade in first question
    var begin = function(i) {
        $('#intro').fadeOut('slow',function(){
            $(this).next().children().first().fadeIn();
        });
        qCount += 1;
    };

    // fade out current question and fade in next question
    var forward = function(i) {
        $('#question_' + i).fadeOut(function(){
            $(this).next().fadeIn();
        });
        qCount += 1;
    };

    // fade out current question and fade in previous question
    var backward = function(i){
        $('#question_' + i).fadeOut(function(){
            $(this).prev().fadeIn();
        });
        qCount -= 1;
    };

    // fade out last question and display score results within #score div
    var end = function(i) {
        $('#question_' + i).fadeOut(function(){
					var resultsColor = $('p#final');
            $('.content').not($('#score')).hide();
            $('#final').empty().append(total() + '%');
						if(points < 40){
								resultsColor.css('color','red');
						} else if (points <= 70){
								resultsColor.css('color','rgb(231, 231, 85)');
						} else if (points > 70){
								resultsColor.css('color','green');
						}
						$('#score').fadeIn();
        });
    };

    var next = function(i) {
				var nextButton = $('#question_' + i + ' .next');
        // if no question is displayed, display the first question
        if(i === 0) {
                begin(i);
        // as long as a choice is selected
        } else {
					if (answer(i) !== false){
            // if no more questions remain, show results
            if(i === (l)){
                end(i);
            // if more questions remain, show next question
            } else {
                forward(i);
            }
        	} else {
						nextButton.removeClass('btn-success').addClass('btn-danger');
					}
				}
    };


    ////////////
    //  main  //
    ////////////

$(function(){
		
		$('.question').on("click",".choice", function(){
			var nextButton = $('#question_' + qCount + ' .next');
			if (nextButton.hasClass('btn-danger')){
				nextButton.removeClass('btn-danger').addClass('btn-success');
			}
		})
		


    $('.start').click(function(){
        next(qCount);
    });

    $('#retry').click(function(){
        set();
				$('.start').trigger("click");
    });
		
    // .on() is used for dynamically created links that were created after the document and scripts loaded

		$('.question').on("click",".next",function() {
        next(qCount);
        answer(qCount);
    });

    $('.question').on("click",".previous",function() {
        backward(qCount);
        answer(qCount);
    });

		// Get the HTML from the template  in the script tag
    var source = $("#questionHB").html();
    // Compile the template
    var template = Handlebars.compile(source);
		// append compiled template to the end of .QUESTION
 		$(".question").append(template(allQuestions)); 

		set();

    // flash a highlight on the correct answer if use presses "c" on keyboard
    $(document).keypress(function(e) {
        // if letter "c" is pressed
        if(e.which === 99) {
            // loop through each question
            $.each(allQuestions.questions, function(i){
                // loop through each choice within current question
                $.each(allQuestions.questions[i].choices, function(x){
                    // if current choice within current question is equal to current questions correctAnswer value
                    if(allQuestions.questions[i].choices[x].choice.toLowerCase() === allQuestions.questions[i].correctAnswer.toLowerCase()){
                        // select that specific choices <label> element and store in variable
                        var correct = $("#question_" + (i+1) + " #choice_" + (x+1));
												if (correct.hasClass('active')) {
													correct.removeClass('active');
												}
                        // get current background-color
                        // clear any previous button presses and animate the background with a flash of yellow
                        correct.focus();
                    }
                });
            });
        }
    });

});