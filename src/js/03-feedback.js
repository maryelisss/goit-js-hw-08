import throttle from 'lodash.throttle';

const form = document.querySelector(' .feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));


populateFeedback();

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};


function onFormSubmit(evt) { 
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function populateFeedback() {
    const savedFeedback = localStorage.getItem(STORAGE_KEY);
    if (savedFeedback) {
        email.value = JSON.parse(savedFeedback).email || '';
        message.value = JSON.parse(savedFeedback).message || '';

    }
};