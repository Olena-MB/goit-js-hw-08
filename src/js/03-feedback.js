//додай до проекту і використовуй бібліотеку lodash.throttle
import throttle from 'lodash.throttle';

//Нехай ключем для сховища буде рядок "feedback-form-state"
const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

//Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд
//1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт 
//з полями email і message, у яких зберігай поточні значення полів форми. 
feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  let perFilters = localStorage.getItem(LOCALSTORAGE_KEY);
  perFilters = perFilters ? JSON.parse(perFilters) : {};
  perFilters[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(perFilters));
}

//Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, 
//заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
initForm();
  
function initForm() {
  let perFilters = localStorage.getItem(LOCALSTORAGE_KEY);
  if (perFilters) {
    perFilters = JSON.parse(perFilters);
    Object.entries(perFilters).forEach(([name, value]) => {
        feedbackForm.elements[name].value = value;
    });
  }
}

//Під час сабміту форми очищуй сховище і поля форми, 
//а також виводь у консоль об'єкт з полями email, message та 
//їхніми поточними значеннями.

feedbackForm.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
  const message = e.target.elements.message.value;

  if (email === '' || message === '') {
    console.log("Please entered data in all fields");
  } else {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log({ email, message });
  }
  e.currentTarget.reset();
}
    // const formData = new FormData(feedbackForm);
    // formData.forEach((value, name) => console.log(value, name));
    // e.currentTarget.reset();
    // localStorage.removeItem(LOCALSTORAGE_KEY);
  
