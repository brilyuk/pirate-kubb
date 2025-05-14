gsap.registerPlugin(ScrollTrigger);
const header = document.querySelector(".header");
const headroom = new Headroom(header);
// const isMobile = window.innerWidth < 768;
const isMobile = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	const isIPad = /ipad/.test(userAgent) || (navigator.maxTouchPoints > 0 && /macintosh/.test(userAgent));
	const isIPhone = /iphone/.test(userAgent);
	const isAndroid = /android/.test(userAgent);
	const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	const isSmallScreen = window.innerWidth < 1024;

	return (isIPad || isIPhone || isAndroid || (isTouchDevice && isSmallScreen));
};

const isMobileDevice = isMobile();

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

const showMoreFaqItems = () => {
	const faq = document.querySelector(".faq");
	if (!faq) return;

	const faqItems = faq.querySelectorAll(".faq__item");
	const showMoreButton = faq.querySelector(".faq__button");
	const itemsToShow = isMobileDevice ? 5 : 10;
	
	faqItems.forEach((item, index) => {
		if (index >= itemsToShow) {
			item.style.display = "none";
		}
	});

	if (faqItems.length <= itemsToShow) {
		showMoreButton.style.display = "none";
	}
	
	if (showMoreButton) {
		showMoreButton.addEventListener("click", (e) => {
			e.preventDefault();
			
			faqItems.forEach((item, index) => {
				if (index >= itemsToShow) {
					item.style.display = item.style.display === "none" ? "block" : "none";
				}
			});
			showMoreButton.style.display = "none";
		});
	}
}


const initSlider = () => {
	if (isMobileDevice) {
		const slider = document.querySelector('.swiper');
		if (slider) {
			const swiper = new Swiper(slider, {
				slidesPerView: 3.5,
				slideToScroll: 1,
				loop: false,
				navigation: {
					nextEl: '.swiper__button.next',
					prevEl: '.swiper__button.prev',
				},
			});
		}
	}
}

const scrollToSection = () => {
	const links = document.querySelectorAll('a[href*="#"]');
	if (!links.length) return;

	links.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const sectionId = link.getAttribute('data-to-scroll');
			const section = document.getElementById(sectionId);
			const isHomePage = window.location.pathname === '/';
			
			if (isHomePage) {
				if (section) {
					section.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			} else {			
				sessionStorage.setItem('scrollToSection', sectionId);
				window.location.href = '/';
			}
		});
	});

	const savedSectionId = sessionStorage.getItem('scrollToSection');
	if (savedSectionId) {
		const section = document.getElementById(savedSectionId);
		if (section) {
			setTimeout(() => {
				section.scrollIntoView({ behavior: 'smooth', block: 'start' });
				sessionStorage.removeItem('scrollToSection');
			}, 500);
		}
	}
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

const updatePageAfterSuccessForm = () => {
	const modal = document.querySelector('.success-modal');
	if (!modal) return;

	const closeButton = modal.querySelector('.success-modal__content-close');
	closeButton.addEventListener('click', (e) => {
		e.preventDefault();
		window.location.reload();
	});
}

const removeEmptyFields = () => {
	const submitButton = document.querySelector('#remove-empty-fields');
	if (!submitButton) return;
	
	submitButton.addEventListener('click', event => {
		event.preventDefault();
		const form = document.querySelector('form');
		const formButton = form.querySelector('.form__footer [type="submit"]');
		const buttons = form.querySelectorAll('button:not(.form__submit):not(uc-drop-area button)');
		
		buttons.forEach(button => button.parentNode.removeChild(button));
		setTimeout(() => {
			formButton.click();
		}, 100);
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

const animatePopupElements = (modal) => {
	const elements = modal.querySelectorAll('[data-opacity-animation]');
	if (!elements) return;
	
	elements.forEach((element, index) => {
		const duration = 1;
		const delay = index;
		
		gsap.to(element, { opacity: 1,  duration, delay, ease: "power2.out" });
	});
}

const modalToggle = () => {
	const modals = document.querySelectorAll('.modal');
	const modalButtons = document.querySelectorAll('[data-modal-target]');

	const openModal = (modal) => {
		modal.classList.add('open');
		document.body.classList.add('modal-opened');
		animatePopupElements(modal);
	}

	const closeModal = (modal) => {
		modal.classList.remove('open');
		document.body.classList.remove('modal-opened');
		
		gsap.globalTimeline.resume();
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
			button.addEventListener('click', (e) => {
				e.preventDefault();
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

const videoToggle = () => {
	const videoBox = document.querySelector(".video-box");
	if (!videoBox) return;
	
	const image = videoBox.querySelector(".video-box__image");
	const video = videoBox.querySelector("video");
	const source = document.createElement('source');
	const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

	source.src = isMobileDevice
		? video.getAttribute('data-src-mobile')
		: video.getAttribute('data-src-desktop');

	source.type = 'video/mp4';
	video.appendChild(source);	

	if (image && video) {
		image.addEventListener("click", function () {
			if (isVideoPlaying(video)) {
				video.pause();
				image.classList.remove("hide");
			} else {
				video.play();
				image.classList.add("hide");
			}
		});
	}
}

const uploadFiles = () => {
	const ctx = document.querySelector('#uploaderctx');
	if (!ctx) return;
	
	const formatFileSize = (bytes) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `(${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]})`;
	};
	
	ctx.addEventListener('file-url-changed', (e) => {
		const fileData = e.detail;
		const filesContainer = document.querySelector('.add-files');
		const templateFile = document.querySelector('.add-file');
		const fileUrlInput = document.querySelector('#file_url');
		
		if (filesContainer && templateFile) {
			const newFile = templateFile.cloneNode(true);
			const nameElement = newFile.querySelector('.add-file__content-wrap-name');
			const sizeElement = newFile.querySelector('.add-file__content-wrap-size');
			
			newFile.setAttribute('data-uuid', fileData.internalId);
			
			if (nameElement) nameElement.textContent = fileData.name;
			if (sizeElement) sizeElement.textContent = formatFileSize(fileData.size);
			
			newFile.classList.add('show');
			filesContainer.appendChild(newFile);
			
			if (fileUrlInput && fileData.cdnUrl) {
				const currentUrls = JSON.parse(fileUrlInput.value || '[]');
				currentUrls.push(fileData.cdnUrl);
				fileUrlInput.value = JSON.stringify(currentUrls);
			}

			const removeButton = newFile.querySelector('.add-file__content-wrap-remove');
			
			if (removeButton) {
				removeButton.addEventListener('click', () => {	
					const uploadButton = document.querySelector('uc-file-uploader-regular button[type="button"]');
					if (uploadButton) {
						uploadButton.click();
					}
				});
			}
		}
	});
	
	ctx.addEventListener('file-removed', (e) => {
		const removedFileId = e.detail.internalId;
		const fileToRemove = document.querySelector(`.add-file[data-uuid="${removedFileId}"]`);
		const fileUrlInput = document.querySelector('#file_url');
		
		if (fileToRemove) {
			fileToRemove.remove();
		}
		
		if (fileUrlInput) {
			const currentUrls = JSON.parse(fileUrlInput.value || '[]');
			const updatedUrls = currentUrls.filter(url => url !== e.detail.cdnUrl);
			fileUrlInput.value = JSON.stringify(updatedUrls);
		}
	});
}

const getRandomDelay = () => {
	const delays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5];
	return delays[Math.floor(Math.random() * delays.length)];
}

const scrollAnimation = () => {
	const header = document.querySelector('.header');
	const blocks = document.querySelectorAll('[data-fade-animation]');
	const elements = document.querySelectorAll('[data-element], [data-opacity-animation]');
	
	gsap.from(header, {
		duration: 1,
		onStart: () => {
			header.classList.add('headroom--unpinned');
		}
	});

	blocks.forEach(block => {
		const duration = block.dataset.animationDuration || 0.5;
		const delay = block.dataset.animationDelay || 0;
		const once = block.dataset.animationOnce === 'true';
		
		const TL = gsap.timeline({
			scrollTrigger: {
				trigger: block,
				start: 'top 80%',
				end: 'bottom 20%',
				once: once,
				markers: false
			}
		});
		TL.from(block, { opacity: 0, y: 100,  duration, delay, ease: "power2.out" });
	});

	elements.forEach(element => {
		const duration = element.dataset.animationDuration || 1;
		const delay = element.dataset.animationDelay || getRandomDelay();
		const once = element.dataset.animationOnce === 'true';

		const TL = gsap.timeline({
			scrollTrigger: {
				trigger: element,
				start: 'top 80%',
				end: 'bottom 20%',
				once: once,
				markers: false
			}
		});
		TL.from(element, { opacity: 0,  duration, delay, ease: "power2.out" });
	});
}

const customizeFooter = () => {
	const footer = document.querySelector('.footer');
	if (!footer) return;
	
	const footerInner = footer.querySelector('.footer__inner');
	const footerLogos = footer.querySelector('.footer__logos');
	const footerSocials = footer.querySelector('.footer__socials');
	const footerAside = footer.querySelector('.footer__aside');
	const footerAsideWrap = footer.querySelector('.footer__aside-wrap');
	const footerAsideBottom = footer.querySelector('.footer__aside-bottom');

	if (isMobileDevice) {
		footerAside.appendChild(footerAsideWrap);
		footerAside.appendChild(footerSocials);
		footerAside.appendChild(footerLogos);
		footerAside.appendChild(footerAsideBottom);
	} else {
		footerInner.appendChild(footerLogos);
		footerInner.appendChild(footerSocials);
		footerInner.appendChild(footerAside);
	}
}

const checkCookieConsent = () => {
	return document.cookie.includes('cookieConsent=true');
}

const setCookieConsent = () => {
	const date = new Date();
	date.setFullYear(date.getFullYear() + 1);// The cookie will be valid for 1 year
	document.cookie = `cookieConsent=true; expires=${date.toUTCString()}; path=/`;
}

const initCookieBanner = () => {
	const acceptButton = document.querySelector('.cookie-banner-button-2---brix');
	const banner = document.querySelector('.cookie');
	

	if (!checkCookieConsent()) {
		banner.style.display = 'block';
	}

	if (acceptButton) {
		acceptButton.addEventListener('click', function(e) {
			e.preventDefault();
			setCookieConsent();
		});
	}
}

const dataAttributeLocalization = () => {
	const currentLocale = document.documentElement.lang;
	const localeElements = document.querySelectorAll(`[data-locale-${currentLocale}]`);

	localeElements.forEach(element => {
		if (element.hasAttribute(`data-locale-${currentLocale}`)) {
			element.src = element.getAttribute(`data-locale-${currentLocale}`);
		}
	});
}

window.onload = () => {
	headroom.init();
	toggleFaqItems();
	showMoreFaqItems();
	scrollToSection();
	toggleSelect();
	removeEmptyFields();
	modalToggle();
	videoToggle();
	updatePageAfterSuccessForm();
	uploadFiles();
	scrollAnimation();
	customizeFooter();
	initCookieBanner();
	dataAttributeLocalization();
	
	setTimeout(() => {
		wavesAnimation();
		elementsAnimation();
		morphAnimation();
		initSlider();
	}, 3000);
}
