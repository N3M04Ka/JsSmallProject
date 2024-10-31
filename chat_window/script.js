import data from './users.json' with {type: 'json'};
let current_user = data[0];
let change_user = document.getElementById('change_user');
change_user.addEventListener('click', () => {
    if (current_user.user_id == data[0].user_id)
        current_user = data[1];
    else
        current_user = data[0];
})
document.addEventListener('keydown', event => {
    if (event.key == 'Enter' && document.getElementById('message_input').value != '')
        sendMessage();
})
let chat_window = document.querySelector('.chat_message_window');
let input_elem = document.getElementById('message_input');
let send_btn = document.getElementById('sendBtn');
send_btn.addEventListener('click', sendMessage)
function sendMessage() {
    let text_message = document.createElement('p');
    text_message.textContent = input_elem.value;
    text_message.classList.add('message_text');
    input_elem.value = '';
    if (chat_window.childElementCount != 0) {
        if (chat_window.lastElementChild.id == current_user.user_id) {
            chat_window.lastElementChild.appendChild(text_message)
        }
        else {
            let other_user_message = document.createElement('div');
            if (chat_window.lastElementChild.className == 'other_message') {
                other_user_message.classList.add('your_message');
            }
            else
                other_user_message.classList.add('other_message');
            let name_img_holder = document.createElement('div');
            name_img_holder.classList.add('user_img_name');
            let user_name = document.createElement('p');
            user_name.classList.add('username');
            user_name.textContent = current_user.name;
            other_user_message.id = current_user.user_id;
            let img_elem = document.createElement('img');
            img_elem.classList.add('user_icon');
            img_elem.setAttribute('src', current_user.img_url);
            if (other_user_message.className == 'your_message') {
                name_img_holder.append(user_name);
                name_img_holder.append(img_elem);
            }
            else {
                name_img_holder.append(img_elem);
                name_img_holder.append(user_name);
            }
            other_user_message.append(name_img_holder);
            other_user_message.append(text_message);
            chat_window.append(other_user_message);
        }
    }
    else {
        let other_user_message = document.createElement('div');
        if (current_user.id == "1") {
            other_user_message.classList.add('your_message');
        }
        else
            other_user_message.classList.add('other_message');
        let name_img_holder = document.createElement('div');
        name_img_holder.classList.add('user_img_name');
        let user_name = document.createElement('p');
        user_name.classList.add('username');
        user_name.textContent = current_user.name;
        other_user_message.id = current_user.user_id;
        let img_elem = document.createElement('img');
        img_elem.classList.add('user_icon');
        img_elem.setAttribute('src', current_user.img_url);
        if (other_user_message.className == 'your_message') {
            name_img_holder.append(user_name);
            name_img_holder.append(img_elem);
        }
        else {
            name_img_holder.append(img_elem);
            name_img_holder.append(user_name);
        }
        other_user_message.append(name_img_holder);
        other_user_message.append(text_message);
        chat_window.append(other_user_message);
    }
}