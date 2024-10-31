let addbutton = document.getElementById('mybtn');
let task_panel = document.getElementsByClassName('tasks_panel')[0];
let count = 0;
if_stack_empty();
function if_stack_empty() {
    if (count == 0) {
        let text = document.createElement('p');
        text.textContent = "The list is empty...";
        text.classList.add('task_text');
        task_panel.append(text)
    }
}

addbutton.addEventListener('click', () => {
    if (count == 0) {
        task_panel.innerHTML=''
    }
    let input = document.getElementById('myinput').value;
    document.getElementById('myinput').value = '';
    if (input == '') return;
    let task = document.createElement('div');
    task.classList.add('task');
    let task_text = document.createElement('p');
    task_text.classList.add('task_text');
    let task_delete_btn = document.createElement('button');
    task_delete_btn.classList.add('tast_delete_btn');
    let i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add('fa-trash')
    task_delete_btn.append(i)
    task_delete_btn.addEventListener('click', () => {
        task_delete_btn.parentElement.style.display = 'none';
        count--;
        if (count == 0)
            if_stack_empty()
    })
    task_text.textContent = input;
    task.append(task_text);
    task.append(task_delete_btn);
    task_panel.append(task)
    count++;
})
