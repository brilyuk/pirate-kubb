gsap.registerPlugin(ScrollTrigger);

const toggleFaqItems = () => {
	const faq = document.querySelector(".faq");
	if (!faq) return;
	
	const faqItems = faq.querySelectorAll(".faq__item");
	faqItems.forEach((item) => {
		item.querySelector(".faq__item-header").addEventListener("click", () => {
			item.classList.toggle("active");
		});
	});
}

const toggleSelect = () => {
	const select = document.querySelector('.form-select');
	if (!select) return;
	
	const selectList = select.querySelector('.form-select__list');
	const selectTitle = select.querySelector('.form-select__title');
	const selectInput = select.querySelector('.form-select__input');
	const selectOptions = selectList.querySelectorAll('.form-select__option');
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
	const submitButton = document.querySelector('#remove-empty-fields');
	if (!submitButton) return;
	
	submitButton.addEventListener('click', event => {
		event.preventDefault();
		const form = document.querySelector('form');
		const buttons = form.querySelectorAll('button');
		buttons.forEach(button => button.parentNode.removeChild(button));
		const formButton = form.querySelector('[type="submit"]');
		formButton.click();
	});
}

const wavesAnimation = () => {
	const waves = document.querySelectorAll('.wave');
	if (!waves) return;
	
	waves.forEach((wave, index) => {
		const delay = index * (2 / waves.length);
		
		gsap.to(wave, {
			duration: 3,
			scaleX: 1.5,
			delay: delay,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			scrollTrigger: {
				trigger: wave,
				toggleActions: "play pause resume pause"
			}
		});
	});
}

const elementsAnimation = () => {
	const elements = document.querySelectorAll('[data-element]');
	if (!elements) return;
	
	elements.forEach((element, index) => {
		const value = element.dataset.element;
		const delay = index * (2 / elements.length);
		
		gsap.to(element, {
			duration: 2,
			y: value,
			delay: delay,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			scrollTrigger: {
				trigger: element,
				toggleActions: "play pause resume pause"
			}
		});
	});
}

const morphAnimation = () => {
  const shapes = document.querySelectorAll('.shape-morph');
  if (!shapes) return;

  shapes.forEach((shape, index) => {
    const startPath = shape.getAttribute('d');
    const endPath = shape.dataset.morphTo;
    const startDelay = index * 1000;
    
    anime({
      targets: shape,
      d: [
        { value: startPath },
        { value: endPath },
        { value: startPath }
      ],
      duration: 10000,
      loop: true,
      delay: startDelay,
      endDelay: 0,
      direction: 'normal',
      easing: 'easeInOutSine',
      autoplay: true
    });
  });
}

const modalToggle = () => {
	const modals = document.querySelectorAll('.modal');
	const modalButtons = document.querySelectorAll('[data-modal-target]');

	const openModal = (modal) => {
		modal.classList.add('open');
		document.body.classList.add('modal-opened');
	}

	const closeModal = (modal) => {
		modal.classList.remove('open');
		document.body.classList.remove('modal-opened');
	}

	const closeAllModals = () => {
		modals.forEach(modal => {
			closeModal(modal);
		});
	}
	
	modals.forEach(modal => {
		if (!modal) return;
		const modalClose = modal.querySelector('.modal__content-close');
		const modalBg = modal.querySelector('.modal__backdrop');	
		
		modalButtons.forEach(button => {
			button.addEventListener('click', () => {
				const modalTarget = button.dataset.modalTarget;
				const modal = document.querySelector(`.modal#${modalTarget}`);
				closeAllModals();
				openModal(modal);
			});
		});

		modalClose.addEventListener('click', () => {
			closeModal(modal);
		});

		modalBg.addEventListener('click', () => {
			closeModal(modal);
		});
	});
}

window.onload = () => {
	toggleFaqItems();
  toggleSelect();
	removeEmptyFields();
	modalToggle();

	setTimeout(() => {
		wavesAnimation();
		elementsAnimation();
		morphAnimation();
	}, 500);
}
