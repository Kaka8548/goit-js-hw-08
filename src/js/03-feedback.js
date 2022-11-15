import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const userData = {};

const onFormElInput = event => {
  event.preventDefault();
  const { target } = event;

  userData[target.name] = target.value;

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
  const userEmail = formEl.elements.email.value;
  const userMessage = formEl.elements.message.value;
  console.log(`User email: ${userEmail}, message: ${userMessage}`);

  event.target.reset();
  localStorage.removeItem('feedback-form-state');
};

formEl.addEventListener('input', throttle(onFormElInput, 500));
formEl.addEventListener('submit', onFormElSumbit);
