
let circul_elem = document.createElement('i');
circul_elem.classList.add("fa-regular", "fa-circle");
let btns = document.querySelectorAll('.cell');
let order = 0;
let array = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
let restart_btn = document.getElementById('restart_btn');
let line = document.querySelector('.line');
restart_btn.addEventListener('click', restartGame)
let h2 = document.querySelector('h2');
let game_change_btn = document.getElementById('change_game_type_btn');
let pvp = false;
let is_game_over = false;
game_change_btn.addEventListener('click', () => {
    if (game_change_btn.textContent == 'PvP') {
        game_change_btn.textContent = 'PvE'
        pvp = true;
    }
    else {
        game_change_btn.textContent = 'PvP';
        pvp = false;
    }
    restartGame();
})

function playGame(elem) {
    if (elem.childElementCount == 1)
        return;
    if (pvp) {
        if (++order % 2) {
            let xmark_elem = document.createElement('i');
            xmark_elem.classList.add('fa-solid', 'fa-xmark');
            elem.append(xmark_elem)
            array[elem.id] = 1;
        }
        else {
            let circul_elem = document.createElement('i');
            circul_elem.classList.add("fa-regular", "fa-circle");
            elem.append(circul_elem);
            array[elem.id] = 0;
        }
        if (order >= 5)
            check_someone_win()
        if (is_game_over)
            return;
        if (order == 9) {
            h2.textContent = "Oops,I guess we have a draw"
            return;
        }
    }
    else {
        let xmark_elem = document.createElement('i');
        xmark_elem.classList.add('fa-solid', 'fa-xmark');
        elem.append(xmark_elem)
        array[elem.id] = 1;
        order++;
        if (order >= 5)
            check_someone_win()
        if (is_game_over)
            return;
        if (order == 9) {
            h2.textContent = "Oops,I guess we have a draw"
            return;
        }
        if (order == 1) {
            let rand;
            while (true) {
                rand = Math.floor(Math.random() * 9);
                if (array[rand] == -1) {
                    array[rand] = 0;
                    let circul_elem = document.createElement('i');
                    circul_elem.classList.add("fa-regular", "fa-circle");
                    let i = 0;
                    Array.from(btns).forEach(elem1 => {
                        if (i++ == rand)
                            elem1.append(circul_elem)
                    })
                    break;
                }
            }
        }
        else if (order > 1) {
            let win_pos_player = CheckRoleWinMove(1);
            let win_pos_computer = CheckRoleWinMove(0);
            if (win_pos_computer != -1 || win_pos_player != -1) {
                let p = (win_pos_computer != -1) ? win_pos_computer : win_pos_player;
                array[p] = 0;
                let circul_elem = document.createElement('i');
                circul_elem.classList.add("fa-regular", "fa-circle");
                let i = 0;
                Array.from(btns).forEach(elem1 => {
                    if (i++ == p)
                        elem1.append(circul_elem)
                })
            }
            else {
                let rand;
                while (true) {
                    rand = Math.floor(Math.random() * 9);
                    if (array[rand] == -1) {
                        array[rand] = 0;
                        let circul_elem = document.createElement('i');
                        circul_elem.classList.add("fa-regular", "fa-circle");
                        let i = 0;
                        Array.from(btns).forEach(elem1 => {
                            if (i++ == rand)
                                elem1.append(circul_elem)
                        })
                        break;
                    }
                }
            }

        }
        order++;
        if (order >= 5)
            check_someone_win()
        if (is_game_over)
            return;
    }

}

function check_someone_win() {
    if (array[0] == array[1] && array[0] == array[2] && array[0] != -1)
        win_display(0, array[0]);
    else if (array[3] == array[4] && array[3] == array[5] && array[3] != -1)
        win_display(1, array[3]);
    else if (array[6] == array[7] && array[6] == array[8] && array[6] != -1)
        win_display(2, array[6]);
    else if (array[0] == array[3] && array[0] == array[6] && array[0] != -1)
        win_display(3, array[0]);
    else if (array[1] == array[4] && array[1] == array[7] && array[1] != -1)
        win_display(4, array[1]);
    else if (array[2] == array[5] && array[2] == array[8] && array[2] != -1)
        win_display(5, array[2]);
    else if (array[0] == array[4] && array[0] == array[8] && array[0] != -1)
        win_display(6, array[0]);
    else if (array[2] == array[4] && array[2] == array[6] && array[2] != -1)
        win_display(7, array[2]);
}
function win_display(code, sign) {
    is_game_over = true;
    line.style.display = 'block';
    if (code < 3) {
        line.style.top = String(code * 95 + 45) + 'px'
    }
    else if (code < 6) {
        line.style.top = '140px';
        line.style.left = String(-100 + (code % 3 * 95) + (code == 5 ? 3 : 0)) + "px"
        line.style.rotate = '90deg';
    }
    else {
        line.style.top = '140px';
        line.style.left = '-5px';
        line.style.rotate = String((code - 6) * 90 + 45) + 'deg';
    }
    if (pvp)
        h2.textContent = (order % 2) ? 'Player1 Won' : "Player2 Won";
    else
        h2.textContent = (sign - 1) ? 'Computer Won' : "Player Won";
}
function restartGame() {
    Array.from(btns).forEach(elem => {
        if (elem.childElementCount != 0) {
            elem.innerHTML = '';
        }
    })
    order = 0;
    array = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    line.style.display = 'none';
    h2.textContent = 'Tic Tac Toe'
    line.style.rotate = '0deg';
    line.style.top = '235px';
    line.style.left = '-5px';
    is_game_over = false;
}
function CheckRoleWinMove(sign) {
    let count;
    let pos;
    for (let y = 0; y < 3; y++) {
        pos = -1;
        count = 0;
        for (let x = 0; x < 3; x++) {
            if (array[x + y * 3] == sign)
                count++;
            else if (array[x + y * 3] == 1 - sign)
                break;
            else
                pos = x + y * 3;
        }
        if (count == 2 && pos != -1)
            return pos;
    }
    for (let x = 0; x < 3; x++) {
        pos = -1;
        count = 0;
        for (let y = 0; y < 3; y++) {
            if (array[x + y * 3] == sign)
                count++;
            else if (array[x + y * 3] == 1 - sign)
                break;
            else
                pos = x + y * 3;
        }
        if (count == 2 && pos != -1)
            return pos;
    }
    pos = -1;
    count = 0;
    for (let i = 0; i < 9; i += 4) {
        if (array[i] == sign)
            count++;
        else if (array[i] == 1 - sign)
            break;
        else
            pos = i;
    }
    if (count == 2 && pos != -1)
        return pos;
    pos = -1;
    count = 0;
    for (let i = 6; i > 0; i -= 2) {
        if (array[i] == sign)
            count++;
        else if (array[i] == 1 - sign)
            break;
        else
            pos = i;
    }
    if (count == 2 && pos != -1)
        return pos;
    return -1;
}