import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", createPromise);

function createPromise(item) {
    item.preventDefault();
    const delay = Number(item.target.elements.delay.value);
    const state = item.target.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else { reject(delay) }
        }, delay);
    });

    promise
        .then((delay) => { 
            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                timeout: 3000
            });
        })
        .catch((delay) => { 
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                timeout: 3000
            });
        });
    
    form.reset();
};