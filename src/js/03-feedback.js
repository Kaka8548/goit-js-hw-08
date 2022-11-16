import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const userData = {};
const userEmail = formEl.elements.email;
const userMessage = formEl.elements.message;

const onFormElInput = event => {
  event.preventDefault();

  userData.email = userEmail.value;
  userData.message = userMessage.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

const fillFormElements = () => {
  if (localStorage.getItem('feedback-form-state') !== null) {
    try {
      const dataToFill = JSON.parse(
        localStorage.getItem('feedback-form-state')
      );
      for (const prop in dataToFill) {
        formEl.elements[prop].value = dataToFill[prop];
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};

fillFormElements();

const onFormElSumbit = event => {
  event.preventDefault();
  console.log(`User email: ${userEmail.value}, message: ${userMessage.value}`);

  event.target.reset();
  localStorage.removeItem('feedback-form-state');
};

formEl.addEventListener('input', throttle(onFormElInput, 500));
formEl.addEventListener('submit', onFormElSumbit);
