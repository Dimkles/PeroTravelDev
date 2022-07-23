

function inputMask() {

	// Маска телефона
	// Для использования добавить data атрибут "data-input-tel"
	let phoneInputs = document.querySelectorAll('input[data-input-tel]');

	let getInputNumbersValue = function(input) {
		return input.value.replace(/\D/g, "");
	}
	let onPhoneInput = function(e) {
		let input = e.target;
		let	inputNumbersValue = getInputNumbersValue(input);
		let formattedInputValue = "";
		let selectionStart = input.selectionStart;

		if (!inputNumbersValue) {
			return input.value = "";
		}
		
		if (input.value.length != selectionStart) {
			if (e.data && /\D/g.test(e.data)) {
				input.value = inputNumbersValue;
			}
			return
		}

		if(["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
			
			if(inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
			let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7"
			formattedInputValue = firstSymbols + " ";
			if (inputNumbersValue.length > 1){
				formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >=5) {
				formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >=8) {
				formattedInputValue += " " + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >=10) {
				formattedInputValue += " " + inputNumbersValue.substring(9, 11);
			}
		} else {
			formattedInputValue = "+" + inputNumbersValue;
		}
		input.value = formattedInputValue;
	}

	let onPhoneKeyDown = function(e) {
		let input = e.target;
		if(e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
			input.value = ""
		}
	}
	let onPhonePaste = function(e) {
		let pasted = e.clipboardData || window.clipboardData;
		let input = e.target;
		let inputNumbersValue = getInputNumbersValue(input);

		if(pasted) {
			let pastedText = pasted.getData("Text");
			if (/\D/g.test(pastedText)) {
				input.value = inputNumbersValue;
			}
		}
	}
	if(phoneInputs) {
		for(let phoneInput of phoneInputs) {
			phoneInput.addEventListener("input", onPhoneInput);
			phoneInput.addEventListener("keydown", onPhoneKeyDown)
			phoneInput.addEventListener("paste", onPhonePaste)
		}
	}
}
inputMask()