const faq = document.querySelector(".faq");
const faqItems = faq.querySelectorAll(".faq__item");

const select = document.querySelector('.form-select');
const selectList = select.querySelector('.form-select__list');
const selectTitle = select.querySelector('.form-select__title');
const selectInput = select.querySelector('.form-select__input');
const selectOptions = selectList.querySelectorAll('.form-select__option');

const submitButton = document.querySelector('#remove-empty-fields');

const toggleFaqItems = () => {
	faqItems.forEach((item) => {
		item.querySelector(".faq__item-header").addEventListener("click", () => {
			item.classList.toggle("active");
		});
	});
}

const toggleSelect = () => {
  select.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('open');
  });
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.form-select')) {
			select.classList.remove('open');
		}
	});
	selectOptions.forEach(option => {
		option.addEventListener('click', (e) => {
			selectTitle.textContent = e.currentTarget.textContent;
			selectInput.value = e.currentTarget.textContent;
		});
	});
}

const removeEmptyFields = () => {
	submitButton.addEventListener('click', event => {
		event.preventDefault();
		const form = document.querySelector('form');
		const buttons = form.querySelectorAll('button');
		buttons.forEach(button => button.parentNode.removeChild(button));
		const formButton = form.querySelector('[type="submit"]');
		formButton.click();
	});
}

document.addEventListener('DOMContentLoaded', () => {
	toggleFaqItems();
  toggleSelect();
	removeEmptyFields();
});
