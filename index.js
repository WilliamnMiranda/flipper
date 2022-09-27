const optionsUser = {
    colorSelected: '',
    wallet: 100,
    selectColor(color) {
        const removeItems = document.querySelectorAll('#select-option div');
        removeItems.forEach((item) => {
            item.classList.remove('activeColor')
        })
        this.colorSelected = color
        document.getElementById(color).classList.add('activeColor')
    },
    bet() {
        if (validationBet()) {
            document.getElementById("game").style.display = "block"
            document.getElementById("options").style.display = "none"
            generationColorAndSelect()
        }
    }
}

const colors = ['purpple', 'green']
const buttonBet = document.getElementById("bet").addEventListener("click", optionsUser.bet)
const buttonGreen = document.getElementById("green").addEventListener("click", () => optionsUser.selectColor('green'));
const buttonPurpple = document.getElementById("purpple").addEventListener("click", () => optionsUser.selectColor('purpple'));
const valueBet = Number(document.getElementById('value-bet').value)
const quantityCoins = document.getElementById("quantity-coins")
const flip = document.getElementById('flip')
document.querySelector('body').onload = onload();

function onload() {
    quantityCoins.innerText = optionsUser.wallet
}

function validationBet() {
    const valueBet = document.getElementById('value-bet').value
    console.log(valueBet)
    if (valueBet != '')
        if (optionsUser.wallet >= valueBet) {
            if (optionsUser.colorSelected !== '')
                return true
            else {
                alert('selecione uma cor')
                return false
            }
        }
        else {
            alert('sem dinheiro na conta')
            return false
        }
    else
        alert('preencha o valor da aposta')
    return false
}

function generationColorAndSelect() {
    const colorGenerate = Math.floor(Math.random() * 2)
    validadeWinner(colorGenerate)
}

function message(message) {
    const messageView = `${message} , deseja apostar novamente`
    const status = confirm(messageView);
    if (status) {
        document.getElementById("game").style.display = "none"
        document.getElementById("options").style.display = "block"
    }
}

function validadeWinner(colorGenerate) {
    const valueBet = Number(document.getElementById('value-bet').value)
    console.log(colorGenerate)
    if (colorGenerate === 0)
        flip.style.animation = 'rotate-back 3s forwards'
    else
        flip.style.animation = 'rotate-front 3s forwards'


    setTimeout(() => {
        if (colors[colorGenerate] == optionsUser.colorSelected) {
            optionsUser.wallet += valueBet
            quantityCoins.innerText = optionsUser.wallet
            setTimeout(() => message('voce ganhou'), 200)
        } else {
            optionsUser.wallet -= valueBet
            quantityCoins.innerHTML = optionsUser.wallet
            setTimeout(() => message('voce perdeu'), 200)
        }
    }, 3100)
}

