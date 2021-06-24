const myFormElem = document.forms.myForm;
const colorInputElem = myFormElem.color;
const typeSelectElem = myFormElem.select;
const codeInputElem = myFormElem.code;
const saveButtonElem = myFormElem.button;
const containerBodyElem = document.querySelector('.container-body');
let codeInputText = myFormElem.querySelector('#code');
const hElem = document.getElementsByTagName('h3')[1];

const сolorWrapElem = document.createElement('div');
const colorWrapItem = document.createElement('div');
const colorText = document.createElement('p');
const typeText = document.createElement('p');
const codeText = document.createElement('p');
сolorWrapElem.classList.add('color-elem');
colorWrapItem.classList.add('color-item');
colorText.classList.add('color');
typeText.classList.add('type');
codeText.classList.add('code');

colorWrapItem.append(colorText);
colorWrapItem.append(typeText);
colorWrapItem.append(codeText);
сolorWrapElem.prepend(colorWrapItem);

const regexpColor = /^[a-zA-Z]+$/i;
const regexpRgbCode = /^([12]([0-4][0-9]|5[0-5])|[1-9][0-9]|[0-9])(?<del>, ?| )([12]([0-4][0-9]|5[0-5])|[1-9][0-9]|[0-9])\k<del>([12]([0-4][0-9]|5[0-5])|[1-9][0-9]|[0-9])$/;
const regexpRgbaCode = /^([12]([0-4][0-9]|5[0-5])|[1-9][0-9]|[0-9])(?<del>, ?| )([12]([0-4][0-9]|5[0-5])|[1-9][0-9]|[0-9])\k<del>([12]([0-4][0-9]|5[0-5])|[1-9][0-9]|[0-9])\k<del>[0-1]$/;
const regexpHexCode = /^#([0-9a-f]{6}|[0-9a-f]{3})$/;

let colorList = [];
saveButtonElem.addEventListener('click', () => {

	const elemClone = сolorWrapElem.cloneNode(true);

	if ( !regexpColor.test(colorInputElem.value) ) {
		colorInputElem.previousElementSibling.lastElementChild.textContent = 'Color can only contain letters';
		return;
	} else {
		colorInputElem.previousElementSibling.lastElementChild.textContent = '';
	}

	switch (typeSelectElem.value) {
		case 'rgb':
			if ( !regexpRgbCode.test(codeInputElem.value) ) {
				codeInputText.textContent =
					'rgb code must match the pattern [0-255],[0-255],[0-255]';
				return;
			} else {
				codeInputText.textContent = '';
				elemClone.style.backgroundColor = `rgb(${codeInputElem.value})`;
			}
			break;

		case 'rgba':
			if ( !regexpRgbaCode.test(codeInputElem.value) ) {
				codeInputText.textContent =
					'rgba code must match the pattern [0-255],[0-255],[0-255],[0-1]';
				return;
			} else {
				codeInputText.textContent = '';
				elemClone.style.backgroundColor = `rgba(${codeInputElem.value})`;
			}
			break;

		default:
			if ( !regexpHexCode.test(codeInputElem.value) ) {
				codeInputText.textContent =
					'hex code must match the pattern #ff0000';
				return;
			} else {
				codeInputText.textContent = '';
				elemClone.style.backgroundColor = codeInputElem.value;
			}
	};

	if ( !colorList.includes(colorInputElem.value.toUpperCase()) ) {
		containerBodyElem.prepend(elemClone);
		saveButtonElem.nextElementSibling.textContent = '';
	} else {
		saveButtonElem.nextElementSibling.textContent = 'Enter a unique name for the color';
	};

	const colorItemClone = elemClone.querySelector('.color');
	const typeItemClone = elemClone.querySelector('.type');
	const coderItemClone = elemClone.querySelector('.code');

	colorItemClone.textContent = colorInputElem.value;
	typeItemClone.textContent = typeSelectElem.value;
	coderItemClone.textContent = codeInputElem.value;
    hElem.textContent = 'All colors';
	colorList.push( colorInputElem.value.toUpperCase() );
});

