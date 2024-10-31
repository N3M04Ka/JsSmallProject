
import data from './questions.json' with {type: 'json'};
let answer_id;
let click_id;
let t;
let time_left;
let is_can_answer;
let number_of_question = 0;
let is_right_answered = false;
let count_of_right_answered_quuestions = data.length;;
preparations();
function preparations() {
    let answers = document.querySelectorAll('.answer');
    addEventListenerToAnswers(answers);
    StartQuiez();
}
function StartQuiez() {
    EnterQuestionData();
}
function EnterQuestionData() {
    if (number_of_question == data.length) {
        document.getElementById('button').textContent = "Show Results";
        return;
    }
    let question_block = getRandomQuestion();
    is_can_answer = true;
    let question = document.getElementById('question');
    document.querySelector('.question_block p').textContent = `${number_of_question} of ${data.length} Questions`;
    question.textContent = question_block.question;
    InputQuestionData(question_block)
    document.getElementById('button').addEventListener('click', nextBtnF);
    timeScaleF();
}
function checkQuestion() {
    if (click_id != answer_id) {
        document.getElementById(`${click_id}`).style.backgroundColor = 'rgb(242, 73, 73)';
        is_right_answered = false;
    }
    else
        is_right_answered = true;
    document.getElementById(`${answer_id}`).style.backgroundColor = 'rgb(73, 242, 73)';
    is_can_answer = false;
    clearInterval(t)
    let timer = document.querySelector('.timer p');
    timer.textContent = `${time_left}s`;
}
function timeScaleF() {
    let timer = document.querySelector('.timer p');
    let time_to_answer_the_question = 6*data.length;
    timer.textContent = `${time_to_answer_the_question}s`
    let start_time = new Date().getTime();
    t = setInterval(() => {
        time_left = Math.floor(time_to_answer_the_question - (new Date().getTime() - start_time) / 1000) + 1;
        if (time_left <= 0) {
            clearInterval(t)
            time_leftF();
        }
        timer.textContent = `${time_left}s`
    }, 100)
}
function time_leftF() {
    document.getElementById(`${answer_id}`).style.backgroundColor = 'rgb(73, 242, 73)';
    is_can_answer = false;
}
function addEventListenerToAnswers(answers) {
    Array.from(answers).forEach(elem => {
        elem.addEventListener('click', () => {
            click_id = Number(elem.id);
            if (is_can_answer)
                checkQuestion()
        })
    })
}
function getRandomQuestion() {
    let rand;
    while (true) {
        rand = Math.floor(Math.random() * data.length)
        if (data[rand] != null)
            break;
    }
    let question = data[rand];
    data[rand] = null;
    number_of_question++;
    return question;
}
function InputQuestionData(data) {
    let answers = document.querySelectorAll('.answer');
    let chosed_element;
    let i = 0;
    Array.from(answers).forEach((elem) => {
        let rand;
        while (true) {
            rand = Math.floor(Math.random() * data.options.length);
            if (data.options[rand] != null)
                break
        }
        chosed_element = data.options[rand];
        data.options[rand] = null;
        if (chosed_element == data.answer)
            answer_id = i;

        elem.style.backgroundColor = 'white';
        elem.textContent = chosed_element;
        i++;
    })
}
function nextBtnF() {
    if (!is_right_answered){
        count_of_right_answered_quuestions--;
    }
    clearInterval(t)
    if (number_of_question < data.length) {
        EnterQuestionData();
        is_right_answered=false;
    }
    else
        showResult();
}
function showResult() {
    let panel = document.querySelector('.panel');
    panel.innerHTML = '';
    let h1_res = document.createElement('h1');
    h1_res.classList.add('result_title');
    h1_res.textContent = 'Your result';
    let h3_1 = document.createElement('h3');
    h3_1.id = 'result';
    h3_1.textContent = `${count_of_right_answered_quuestions} of ${data.length}`;
    let res = count_of_right_answered_quuestions / data.length;
    let h3_2 = document.createElement('h3');
    h3_2.id = 'resultComment';

    if (res <= 0.2) {
        h3_2.textContent = 'Very Bad😥';
        h3_2.style.color='red';
    }
    else if (res <= 0.4) {
        h3_2.textContent = 'Something must be wrong🤔';
        h3_2.style.color='orange';
    }
    else if (res <= 0.6) {
        h3_2.textContent = 'Try again🙂';
        h3_2.style.color='yellow';
    }
    else if (res <= 0.8) {
        h3_2.textContent = 'Very Good😀';
        h3_2.style.color='green';
    }
    else{
        h3_2.textContent = 'Awesom!!🎉';
        h3_2.style.color='rgb(6, 184, 51)';
    }
    let get_back_link=document.createElement('a');
    get_back_link.setAttribute('href',"main_page.html")
    get_back_link.textContent='Other Queizs';
    panel.append(h1_res);
    panel.append(h3_1);
    panel.append(h3_2);
    let a_holder=document.createElement('div');
    a_holder.id='a_holder';
    a_holder.append(get_back_link);
    panel.append(a_holder);
}