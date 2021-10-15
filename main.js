
const question = document.querySelector("#question");
const choices = Array.from(document.getElementsByClassName("option"));
const ques_no = document.querySelector(".ques-no");
const ques_box = document.querySelector(".play-box");

let score = 0;
let currentQuestion = [];
let question_counter =0;
let available_questions = [];
let max_time = 15;

let questions = [{
    question: "How many Horcruxes of Voldemort's are there?",
    choice1: "1",
    choice2: "9",
    choice3: "7",
    choice4: "5",
    answer: 3},

    {question: "Harry has a scare on his forehead. what shape is it?",
    choice1: "Like a pigs tail",
    choice2: "Like a lightning bolt",
    choice1: "Like a shining star",
    choice2: "Like a egg",
    answer: 2},

    {question: "What do Hermione's parents do for a living?",
    choice1: "Veterinarians",
    choice2: "Dentists",
    choice3: "Pediatricians",
    choice4: "Bankers",
    answer: 2},

    {question: "How many Unforgivable curses are there?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3},

    {question: "Who does Hermione go to the Yule Ball with in Harry Potter and the Goblet of Fire?",
    choice1: "Ron",
    choice2: "Viktor Krum",
    choice3: "Cedric Diggory",
    choice4: "Neville Longbottom",
    answer: 2},

    {question: "How does Sirius die in Harry Potter and the Order of the Phoenix?",
    choice1: "Bellatrix LeStrange kills him.",
    choice2: "Voldemort kills him.",
    choice3: "Harry accidentally kills him.",
    choice4: "Dies naturally.",
    answer: 1},

    {question: "What's Voldemort's real name?",
    choice1: "Severus",
    choice2: "Tom",
    choice3: "James",
    choice4: "Remus",
    answer: 2},

    {question: "Where does the name Minerva come from?",
    choice1: "Ancient Rome",
    choice2: "Greece",
    choice3: "Egypt",
    choice4: "A French food",
    answer: 1},

    {question: "Who composed the music for the Harry Potter movies?",
    choice1: "John Williams",
    choice2: "Oliver Phelps",
    choice3: "Robbie Coltrane",
    choice4: "Josh Groban",
    answer: 1},

    {question: "How does Dumbledore die?",
    choice1: "Malfoy kills him",
    choice2: "Snape kills him",
    choice3: "Dies by accident",
    choice4: "Heart attack",
    answer: 2}
];

start_game = () => {
    question_counter = 0;
    score = 0;
    available_questions = [...questions];
    next_question();
};

function show_score(score){
    if(score == 10){
        ques_box.innerHTML = `
                           Woohoo!!! Congrats , Complete Score<br>
                           ${score} out of ${questions.length} <br>
                           <button class="restart" onclick="location.reload()">Restart</button>`;
    }
    else if (score >= 6) {
        ques_box.innerHTML = `
                           Great Job , You have a fair knowledge about Harry Potter <br>
                           You scored ${score} out of ${questions.length} <br>
                           <button class="restart" onclick="location.reload()">Restart</button>`;
    }
    else if(score > 3 && score < 6){
        ques_box.innerHTML = `
                           Not so good, Better luck next time!! <br>
                           You scored ${score} out of ${questions.length} <br>
                           <button class="restart" onclick="location.reload()">Restart</button>`;
    }
    else {
        ques_box.innerHTML = `
                           You need to watch Harry Potter more, come back after completing the series :))<br>
                           You scored ${score} out of ${questions.length} <br>
                           <button class="restart" onclick="location.reload()">Restart</button>`;
    }

};

next_question = () => {
    if(question_counter >= questions.length){
        show_score(score);
    }

    question_counter++;
    const question_index = Math.floor(Math.random() * available_questions.length);
    currentQuestion = available_questions[question_index];
    question.innerHTML = currentQuestion.question;
    ques_no.innerHTML = `Question: ${question_counter}`;
    
    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerHTML = currentQuestion["choice" + number];
    });

    available_questions.splice(question_index, 1);
};

choices.forEach((choice) => {
    choice.addEventListener("click", event => {

        const selected_choice = event.target;
        const selected_option_no = selected_choice.dataset['number'];
        var apply_class = "incorrect";
        if(selected_option_no == currentQuestion.answer){
            apply_class = "correct";
            score++;
        }

        selected_choice.classList.add(apply_class);
        
        setTimeout( () => { 
            selected_choice.classList.remove(apply_class);
            next_question();
        }, 500);
    });
});

start_game();
