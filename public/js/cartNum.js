let NumShow = document.querySelector('#buyNum');
function sum() {
    let sum = 0;
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i));
        let cart = JSON.parse(localStorage.getItem(localStorage.key(i)))
        let num = parseInt(cart.value);
        sum += num;
    }
    NumShow.innerHTML = sum;
    if (sum <= 0) {
        NumShow.style.display = "none";
    } else {
        NumShow.style.display = "block";
    }
}
sum();