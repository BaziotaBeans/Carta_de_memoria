let add_question = document.querySelector('.add-pergunta');
let modal = document.querySelector('.modal');
let btn_close_modal = document.querySelector('.btn-close');
let btn_add_question = document.querySelector('.btn-add-question');
let question_text = document.querySelector('.question-text');
let answer_text = document.querySelector('.answer-text');
let dropzone = document.querySelector('.dropzone');
let element_number_of_card = document.querySelector('.number-of-card');
let message_is_empty = document.querySelector('.message-empty-question');
let question_text_edited;
let answer_text_edited;
let event_target;
let flag_edited = false;
let number_of_card = 0;
let card_class_index = 0;
let class_name_of_card;
            
/*
    Renderizador Geral
*/
render(); 


function render(){
    element_number_of_card.textContent = number_of_card;
    modal.style.display = 'none';
    question_text.value = '';
    answer_text.value = '';
    document.querySelector('.question-r').classList.remove('requried-info-active');
    document.querySelector('.answer-r').classList.remove('requried-info-active');
    flag_edited = false;
    if(number_of_card > 0){
        dropzone.style.display = 'flex';
        message_is_empty.style.display = 'none';
    }else{
        dropzone.style.display = 'none';
        message_is_empty.style.display = 'flex';        
    }
}
            

function resetText(){
    question_text.value = '';
    answer_text.value = '';
    modal.style.display = 'none';
}

add_question.addEventListener('click', () =>{
    modal.style.display = 'flex';

});

btn_close_modal.addEventListener('click', () =>{
    render();
});
document.addEventListener('click', event =>{
    if(event.target === modal){
        render();
    } 
});

/*
    Não foi usada!
*/
function findLastIndex(str){
    if(typeof(str) === 'string'){
        let arr = str.split('');
        return arr[arr.length - 1];
    }
}
            
            
btn_add_question.addEventListener('click', () =>{
    let question_text_value = question_text.value;
    let answer_text_value = answer_text.value;
    console.log(question_text_value);
    if(isEmpty(question_text_value)) document.querySelector('.question-r').classList.add('requried-info-active');
    else document.querySelector('.question-r').classList.remove('requried-info-active');
    if(isEmpty(answer_text_value)) document.querySelector('.answer-r').classList.add('requried-info-active');
    else document.querySelector('.answer-r').classList.remove('requried-info-active');
    if(!isEmpty(question_text_value) && !isEmpty(answer_text_value)){
        if(flag_edited){

            let card_editable = document.getElementsByClassName(class_name_of_card);

            console.log('Fui Editado!');
            card_editable[0].firstElementChild.firstElementChild.firstElementChild.textContent = question_text_value;
            card_editable[0].firstElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent = answer_text_value;
            render();


        }else{
            number_of_card++;
            card_class_index++;
            let html = '<div class="flip-card number-of-card-'+card_class_index+'" draggable="true"><div class="flip-card-inner"><div class="flip-card-front"><h2 class="question-text">$question_text</h2></div><div class="flip-card-back"><h1 class="answer-text">$answer_text</h1><div class="btn-container"><button class="btn-edit"><i class="fas fa-edit"></i></button><button class="btn-delete"><i class="far fa-trash-alt"></i></button></div></div></div></div>';
            html = html.replace('$question_text',question_text_value);
            html = html.replace('$answer_text', answer_text_value);
            dropzone.insertAdjacentHTML('beforeend', html);
            render(); 
        }
    }


});

dropzone.addEventListener('click', (e) =>{
    const event_target = this;
    const element = e.target;

    if(element.className == 'far fa-trash-alt'){
        dropzone.removeChild(element.parentNode.parentNode.parentNode.parentNode.parentNode);
        number_of_card--;
        render(); 
    }
    if(element.className == 'fas fa-edit')
    {
        let elemento = element.parentNode;
        answer_text_edited = element.parentNode.parentNode.previousElementSibling.textContent;
        console.log(answer_text_edited);
        class_name_of_card = element.parentNode.parentNode.parentElement.parentElement.parentElement.className;

        console.log(class_name_of_card);

        question_text_edited = element.parentNode.parentNode.previousElementSibling.parentNode.previousElementSibling.firstElementChild.textContent;

        console.log(question_text_edited);
        console.log(event_target.parentNode);
        flag_edited = true;
        question_text.value = question_text_edited;
        answer_text.value = answer_text_edited;
        modal.style.display = 'flex';
    }   
});

            

function isEmpty(str){
    if(typeof(str) === 'string'){
        if(str === '') return true;
        else return false;
    }
}