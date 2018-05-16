window.addEventListener('DOMContentLoaded', function(){

	// событие при клике по кнопке "создать"
	let	createBtn = document.getElementById('popup-btn'),
			overlay = document.querySelector('.overlay'),
			popup = document.querySelector('.popup'),
			custom = document.querySelector('.custom'),
			customDiv = custom.getElementsByTagName('div'),
			main = document.querySelector('.main');

	createBtn.addEventListener('click', () => {
		//немного анимируем уползание "popap" вверх + изменение прозрачности подложки 
		//со скрытием main-блока и проявлением custom-блока
		const opacityStep = 0.006,
					alphaStep = 0.004,
					topStep = 4.5;

		let opacityValue = 1,
				alphaValue = 0.8,
				posTop = 150,
				i = 1,
				repeat = setInterval(startAnimate, 10);

		function startAnimate () {
			if (i < 50) {
				alphaValue += alphaStep;
				overlay.style.backgroundColor = "rgba(31, 140, 226, " + alphaValue +")";
				posTop -= topStep;
				popup.style.top = posTop + 'px';
				i++;
			} else if (i == 50) {
				//при полностью непрозрачной подложке, скрываем main-блок и показываем custom-блок
				main.style.display = 'none';
				custom.style.display = 'flex';
				for (let i = 0; i < customDiv.length; i++) {
					let string = customDiv[i].className,
							substring = "custom-";
					if (string.indexOf(substring) !== -1) {
						customDiv[i].style.display = 'block';
					}
				}
				i++;
			}	else if ((i > 50) && (i < 237)) {
				opacityValue -= opacityStep;
				overlay.style.opacity = opacityValue;
				posTop -= topStep;
				popup.style.top = posTop + 'px';
				i++;
			}	else if (i == 237) {
				//на всякий пожарный возвращаем настройки "как было" и скрываем=)
				overlay.style.cssText = "display: none; background-color: rgba(31, 140, 226, 0.8); opacity: 1";
				popup.style.cssText = "display: none; top: 150px";
				clearInterval(repeat);
			} else {
				console.log('что-то пошло не так');
			}
		}
	});


	//ПЕРЕНОС ДАННЫХ ИЗ АНКЕТЫ КАНДИДАТА В КАРТОЧКУ

	//проверка,чтобы вводились только русские буквы и содержалось не менее 2х пробелов
	function correctName(name) {
		let space  = 0,
		    res = 1;
		if (name.trim() === '') {
			res=res*0;
			alert('Пожалуйста, заполните ФИО Вашего кандидата'); 
		} else {
			for (let i = 0; i < name.length; i++) {
				if ((/^[А-ЯЁ]*$/i.test(name[i])) || (name[i] === ' ')||(name[i] === '-')) { 
						res = res*1;
						if (name[i] === ' '){
							space++;
						}
				} else { 
					res=res*0;
				}
			} 
		}

		if ((res === 0) || !isNaN(name)) { 
				//console.log("это не то");
				alert("Используйте только русские буквы!");
				candidateName.value = '';
				return false;
			} else {
				//удаляем лишние пробелы в начале и конце строки
				let newName = name.trim();
				newName = newName.replace(/  /g, ' ');	
				if (name.length > newName.length) {
					space -= name.length-newName.length;
				}
				//проверяем на пробелы( в ФИО должно быть минимум 3 слова)
				if (space < 2) {
					console.log("подозрительно мало пробелов");
					alert("Проверьте, всё ли Вы указали?");
					return false;
				} else {
					//console.log("все отлично!");
					return true;
				}
			}
	}

	//собираем кандидата

	let candidateName = document.getElementById('name'),
			candidateAge = document.getElementById('age'),
			sexRadio = document.querySelector('.radio'),
			candidateSex = document.getElementsByName('sex'),
			candidateSelect = document.getElementById('select'),
			candidateBio = document.getElementById('bio'),

			personSkin = document.getElementById('person-skin'),
			personClothes = document.getElementById('person-clothes'),
			personHair = document.getElementById('person-hair'),
			personShoes = document.querySelector('.person-shoes'),

			allHair = document.getElementsByClassName('hair-style'),
			allClothes = document.getElementsByClassName('clothes-style'),
			skin = document.getElementsByClassName('skin-color'),

			myCandidate = {
				name:'',
				age: '',
				bio: '',
				sex : 'Мужской',
				views: 'Либеральные',
				skinNumber: 1,
				hairNumber: 1,
				clothesNumber: 1
			};

	//разделение одежды и прически на мужскую/женскую
	for (let i = 0; i < 8; i++) {
		if (i<4) {
			allHair[i].classList.add('man');
			allClothes[i].classList.add('man');
		} else {
			allHair[i].classList.add('woman');
			allClothes[i].classList.add('woman');
		}
	}

	let hairWoman = document.querySelectorAll('div.hair>.woman'),
			hairMan = document.querySelectorAll('div.hair>.man'),
			hair = hairMan,
			clothesWoman = document.querySelectorAll('div.clothes>.woman'),
			clothesMan = document.querySelectorAll('div.clothes>.man'),
			clothes = clothesMan;

	//поле ФИО
  candidateName.addEventListener('change', () => {
  	correctName(candidateName.value);
  	myCandidate.name = candidateName.value.trim().toUpperCase();
  });
 
  //поле возраст
  candidateAge.addEventListener('change', () => {
  	if (candidateAge.value.trim() === '') {
  		alert('Пожалуйста, укажите возраст Вашего кандидата'); 
  		candidateAge.value= '';
  	} else if (isNaN(candidateAge.value.trim())) {
  		alert('Пожалуйста, указывайте только число!');
  		candidateAge.value= '';
  	} else if ((+candidateAge.value < 35) || (+candidateAge.value > 70)) {
  		alert('Согласно законодательству РФ, возраст кадидата может быть только от 35 до 70 лет');
  		candidateAge.value= '';
  	} 
  		myCandidate.age = candidateAge.value;
  });


  //выбор пола
 	sexRadio.addEventListener('change', function() {
 		if (candidateSex[0].checked) {
 			personSkin.style.backgroundImage = 'url("./img/skin/skin-1.png")';
 			personClothes.style.backgroundImage = 'url("./img/clothes/construct/clothes-1.png")';
			personHair.style.backgroundImage = 'url("./img/hair/construct/hair-1.png")';
			personShoes.style.backgroundImage = 'url(./img/clothes/construct/shoes.png)';
			
			hairMan[0].style.display = 'block';
			clothesMan[0].style.display = 'block';
			for (let i = 0; i < 4; i++) {
				hairWoman[i].style.display = 'none';
				clothesWoman[i].style.display = 'none';
				skin[i].style.display = 'none';
			}

			clothes = clothesMan;
 			hair = hairMan;
 			skin[0].style.display = 'block';

			myCandidate.skinNumber = 1;
			myCandidate.hairNumber = 1;
			myCandidate.clothesNumber = 1;
 			myCandidate.sex = 'Мужской';
 			
 		} else {
 			personSkin.style.backgroundImage = 'url("./img/skin/skin-5.png")';
 			personClothes.style.backgroundImage = 'url("./img/clothes/construct/clothes-5.png")';
			personHair.style.backgroundImage = 'url("./img/hair/construct/hair-5.png")';
			personShoes.style.backgroundImage = 'url(./img/clothes/construct/shoes-2.png)';
			
			hairWoman[0].style.display = 'block';
			clothesWoman[0].style.display = 'block';
			for (let i = 0; i < 4; i++) {
				hairMan[i].style.display = 'none';
				clothesMan[i].style.display = 'none';
				skin[i].style.display = 'none';
			}

			clothes = clothesWoman;
 			hair = hairWoman;
 			skin[0].style.display = 'block';

			myCandidate.skinNumber = 5;
			myCandidate.hairNumber = 5;
			myCandidate.clothesNumber = 5;
 			myCandidate.sex = 'Женский';

 		}	
  });

  //выбор взглядов
  candidateSelect.addEventListener('change', () => {
  	myCandidate.views = candidateSelect.value;
  });

  //заполнение биографии
  candidateBio.addEventListener('change', () => {
  	if (candidateBio.value.trim() === '') {
  		alert('Пожалуйста, опишите биографию Вашего кандидата');
  		candidateBio.value= '';
  	} else if (!isNaN(candidateBio.value.trim())) {
  		alert('Здесь должен быть текст, а не только числа'); 
  		candidateBio.value= '';
  	} 
  	myCandidate.bio = candidateBio.value.trim();
  });


  //главное, чтобы костюмчик сидел)) или выбор облика кандидата
  
  let slideIndex = 1,
  		showIndex = 1,
  		prevSkin = document.querySelector('div.skin > div.prev'),
  		nextSkin = document.querySelector('div.skin > div.next'),
  		prevHair = document.querySelector('div.hair > div.prev'),
  		nextHair = document.querySelector('div.hair > div.next'),
  		prevClothes = document.querySelector('div.clothes > div.prev'),
  		nextClothes = document.querySelector('div.clothes > div.next');

  //слайдер-кожа
  skinSlides(slideIndex);

  function skinSlides(nom) {
  	if (nom > skin.length) {
  		slideIndex = 1;
  	}
  	if (nom < 1) { 
  		slideIndex = skin.length;
  	}

  	for ( let i = 0; i < skin.length; i++) {
  		skin[i].style.display = 'none'; 
  	}
  	skin[slideIndex-1].style.display = 'block';
  	if (myCandidate.sex === 'Мужской') {
  		showIndex = slideIndex;
  	} else {
  		showIndex = slideIndex+4;
  	}
  	myCandidate.skinNumber = showIndex;
  	personSkin.style.backgroundImage = 'url("./img/skin/skin-'+ showIndex +'.png")';
  }
 	//добавление/удаление слайда
  function plusSlidersSkin(nom) {
  	skinSlides(slideIndex += nom);
  }

  //нажатие на кнопку "назад"
  prevSkin.addEventListener('click', function(){
  	plusSlidersSkin(-1);
  });

  //нажатие на кнопку "вперед"
  nextSkin.addEventListener('click', function(){
  	plusSlidersSkin(1);
  });	



  //слайдер-прическа
  hairSlides(slideIndex);

  function hairSlides(nom) {
  	if (nom > hair.length) {
  		slideIndex = 1;
  	}
  	if (nom < 1) { 
  		slideIndex = hair.length;
  	}

  	for ( let i = 0; i < hair.length; i++) {
  		hair[i].style.display = 'none'; 
  	}
  	hair[slideIndex-1].style.display = 'block';
  	if (myCandidate.sex === 'Мужской') {
  		showIndex = slideIndex;
  	} else {
  		showIndex = slideIndex+4;
  	}
  	myCandidate.hairNumber = showIndex;
  	personHair.style.backgroundImage = 'url("./img/hair/construct/hair-'+ showIndex +'.png")';
  }

  //добавление/удаление слайда
  function plusSlidersHair(nom) {
  	hairSlides(slideIndex += nom);
  }

  //нажатие на кнопку "назад"
  prevHair.addEventListener('click', function(){
  	plusSlidersHair(-1);
  });

  //нажатие на кнопку "вперед"
  nextHair.addEventListener('click', function(){
  	plusSlidersHair(1);
  });	




  //слайдер-костюм
  clothesSlides(slideIndex);

  function clothesSlides(nom) {
  	if (nom > clothes.length) {
  		slideIndex = 1;
  	}
  	if (nom < 1) { 
  		slideIndex = clothes.length;
  	}

  	for ( let i = 0; i < clothes.length; i++) {
  		clothes[i].style.display = 'none'; 
  	}
  	clothes[slideIndex-1].style.display = 'block';
  	if (myCandidate.sex === 'Мужской') {
  		showIndex = slideIndex;
  	} else {
  		showIndex = slideIndex+4;
  	}
  	myCandidate.clothesNumber = showIndex;
  	personClothes.style.backgroundImage = 'url("./img/clothes/construct/clothes-'+ showIndex +'.png")';
  }
  
  //добавление/удаление слайда
  function plusSlidersСlothes(nom) {
  	clothesSlides(slideIndex += nom);
  }

  //нажатие на кнопку "назад"
  prevClothes.addEventListener('click', function(){
  	plusSlidersСlothes(-1);
  });

  //нажатие на кнопку "вперед"
  nextClothes.addEventListener('click', function(){
  	plusSlidersСlothes(1);
  });	

  

  //СОЗДАНИЕ КАРТОЧКИ И СБРОС ПРЕДЫДУЩИХ РЕЗУЛЬТАТОВ ГОЛОСОВАНИЯ

  let readyBtn = document.getElementById('ready'),
  		card = document.getElementsByClassName('main-cards-item')[1];

	//функция сброса результатов голосования
	let reset = function(){
		let percent = document.getElementsByClassName('result-count'),
				scale = document.getElementsByClassName('progress-bar'),
				cards = document.getElementsByClassName('main-cards-item');
		for ( let i = 0; i < cards.length; i++) {
			percent[i].textContent = '0%';
			scale[i].style.height = '0%';
			cards[i].classList.remove('main-cards-item-active');
		}
	};

  readyBtn.addEventListener('click', () => {
  	//проверяем, все ли заполненно
  	if((myCandidate.name === '')||(myCandidate.age === '')||(myCandidate.bio === '')) {
  		alert('Пожалуйста, заполните все данные о кандидате');
  	} else {

  		//небольшая анимация смены отображаемых страниц
  		let election = document.createElement('div');
  		election.style.cssText = 'position: fixed; display: block; top: 0; left: 0;'+
  		'width: 100%; height: 100%; z-index: 3;  opacity: 0;'+
  		'background: rgb(31,140,226) url(./img/election.png) center center no-repeat';

  		document.body.appendChild(election);

  		let step = 0.05,
  				i = 1,
  				electionAnimate = function() {
		  			if (i <= 10) {
		  				election.style.opacity = 1;
		  				main.style.display = 'block';
							custom.style.display = 'none';
		  				i++;
		  			}	else if ((i > 10) && (i < 32)) {
		  				election.style.opacity -= step;
		  				i++;
		  			}	else if (i == 32) {
		  				document.body.removeChild(election);
		  				clearInterval(repeat);
		  			} else {
		  				console.log('что-то пошло не так');
		  			}
		  		},
  			repeat = setInterval(electionAnimate, 100);

			//создаем новую карточку с нашим кандидатом
			let newCard = card.cloneNode(true);

			newCard.classList.add("my-card");

			newCard.querySelector('.progress-bar').classList.remove('progress-bar-2');
			newCard.querySelector('.progress-bar').classList.add('progress-bar-3');
			//заполняем нашу карточку
			newCard.querySelector('.name').textContent = myCandidate.name;

			if (+myCandidate.age%10 === 1) {
				newCard.querySelector('.age').textContent = myCandidate.age + " год";
			} else if ((+myCandidate.age%10 === 2)||(+myCandidate.age%10 === 3)||(+myCandidate.age%10 === 4)) {
				newCard.querySelector('.age').textContent = myCandidate.age + " года";
			} else {
				newCard.querySelector('.age').textContent = myCandidate.age + " лет";
			}

			newCard.querySelector('.sex').textContent = myCandidate.sex;
			newCard.querySelector('.views').textContent = myCandidate.views;
			newCard.querySelector('.bio').textContent = myCandidate.bio;

			//добавляем внешний вид
			newCard.querySelector('.photo').classList.remove('photo-2');
			newCard.querySelector('.photo').classList.add('photo-3');
			newCard.querySelector('.photo').innerHTML ='<div class="photo-hair">'+
			'</div><div class="photo-clothes"></div><div class="photo-shoes"></div>';

			newCard.querySelector('.photo-3').style.cssText = 'position: relative; background: url(./img/skin/skin-'+ 
			myCandidate.skinNumber 	+ '.png) center no-repeat;	background-size: cover';

			newCard.querySelector('.photo-hair').style.cssText = 'position: absolute;	top: 0;	left: 0; width: 100%;'+
			'height: 100%; background: url(./img/hair/construct/hair-'+ myCandidate.hairNumber + 
			'.png) center no-repeat; background-size: cover';

			newCard.querySelector('.photo-clothes').style.cssText = 'position: absolute;	top: 0;	left: 0; width: 100%;'+
			'height: 100%; background: url(./img/clothes/construct/clothes-'+ myCandidate.clothesNumber + 
			'.png) center no-repeat; background-size: cover';

			if (myCandidate.sex === 'Мужской') {
	  		newCard.querySelector('.photo-shoes').style.cssText ='position: absolute;	top: 0;	left: 0; width: 100%;'+
			'height: 100%; background: url(./img/clothes/construct/shoes.png) center no-repeat; background-size: cover';
	  	} else {
	  		newCard.querySelector('.photo-shoes').style.cssText ='position: absolute;	top: 0;	left: 0; width: 100%;'+
			'height: 100%; background: url(./img/clothes/construct/shoes-2.png) center no-repeat; background-size: cover';
	  	}

	 	  	//помещаем ее посредине, обнуляем результаты
			card.parentNode.insertBefore(newCard, card);
			reset();
		}
  });


	//КНОПКА "СБРОСИТЬ РЕЗУЛЬТАТЫ"
  let resetBtn = document.getElementById('reset');
  		

  resetBtn.addEventListener('click', () => {
  	
  	//приводим свойства объекта с кандидатом в первоначальный вид
  	myCandidate.name = '';
  	myCandidate.age = '';
  	myCandidate.bio = '';
  	myCandidate.sex = 'Мужской';
  	myCandidate.views = 'Либеральные';
  	myCandidate.skinNumber = 1;
  	myCandidate.hairNumber = 1;
  	myCandidate.clothesNumber = 1;

  	//сбрасываем информацию в слайдере
		personSkin.style.backgroundImage = 'url("./img/skin/skin-1.png")';
		personClothes.style.backgroundImage = 'url("./img/clothes/construct/clothes-1.png")';
		personHair.style.backgroundImage = 'url("./img/hair/construct/hair-1.png")';
		personShoes.style.backgroundImage = 'url(./img/clothes/construct/shoes.png)';
		
		
		for (let i = 0; i<4; i++) {
			hairWoman[i].style.display = 'none';
			clothesWoman[i].style.display = 'none';
			skin[i].style.display = 'none';
			hairMan[i].style.display = 'none';
			clothesMan[i].style.display = 'none';
		}

		clothes = clothesMan;
		hair = hairMan;

		skin[0].style.display = 'block';
		hairMan[0].style.display = 'block';
		clothesMan[0].style.display = 'block';

		//сбрасываем информацию в анкете
		candidateName.value = '';
		candidateAge.value = '';
		candidateBio.value = '';
		if (candidateSex[1].checked) {
			candidateSex[1].checked = false;
			candidateSex[0].checked = true;
		}
		candidateSelect.value = "Либеральные";

  	//анимация смены отображаемых страниц, а также удаления карточки с кандидатом
		let over = document.createElement('div');
		over.style.cssText = 'position: fixed; display: block; top: 0; left: 0;'+
		'width: 100%; height: 100%; z-index: 3; opacity: 0.05; background-color: rgb(31,140,226)';

		document.body.appendChild(over);

		let step = 0.05,
				i = 1,
				overAnimate = function() {
	  			if (i <= 20){
	  				let t = i*step;
	  				over.style.opacity = t;
	  				i++;
	  			} else if (i === 21) {
	  				over.style.opacity = 1;
	  				//скрываем main-блок и показываем custom-блок
	  				main.style.display = 'none';
						custom.style.display = 'flex';
						//получаем и удаляем карточку с кандидатом
				  	let myCard = document.querySelector('.my-card');
				  	myCard.parentNode.removeChild(myCard);
	  				i++;
	  			}	else if ((i > 21) && (i < 24)) {
	  				i++;
	  			}	else if ((i >= 24) && (i < 46)) {
	  				over.style.opacity -= step;
	  				i++;
	  			} else if (i == 46) {
	  				document.body.removeChild(over);
	  				clearInterval(repeat);
	  			} else {
	  				console.log('что-то пошло не так');
	  			}
	  		},
			repeat = setInterval(overAnimate, 25);

	});

	//ПРОВЕСТИ ЧЕСТНОЕ ГОЛОСОВАНИЕ ИЛИ ВМЕШАТЬСЯ В ВЫБОРЫ?

	let votingBtn = document.getElementById('voting'),
			crimeBtn = document.getElementById('crime'),

			//функция поиска случайного целого числа от 0 до 100 
			//с учетом механики округления round
			randomPercent = function () {
      let rand = Math.random() * 101 - 0.5;
      rand = Math.round(rand);
      return rand;
      };

  //функция подбора случайных чисел так, чтобы сумма была = 100
  //параметр res - изменяемый массив с результатами на выходе
  //параметр chit - кол-во процентов, добавляемых нашему кандидату
  function randomVoices(res, chit) {
		let	res1 = randomPercent(),
				res2 = randomPercent(),
				res3 = randomPercent();

		if (res1+res2+res3 === 100-chit) {
				res[0] = res1;
				res[1] = res2 + chit;
				res[2] = res3;
				return;
		} else {
			randomVoices(res, chit);
		}
	}

	//функция отображения результатов на экране (шкала и проценты)
	function showResults(res) {
		let percent = document.getElementsByClassName('result-count'),
				scale = document.getElementsByClassName('progress-bar'),
				cards = document.getElementsByClassName('main-cards-item'),
				win = res[0],
				winNomber = 0;

		//ищем победителя
		for ( let i = 0; i < percent.length; i++) {
			if (res[i] > win) {
				win = res[i];
				winNomber = i;
			}
		}
		 //отображаем результаты и выделяем победителя
		for ( let i = 0; i < percent.length; i++) {
			percent[i].textContent = res[i] + '%';
			scale[i].style.height = res[i] + '%';
			//на всякий пожарный очищаем предыдущих победителей
			cards[i].classList.remove('main-cards-item-active');
			//и выделяем текущего
			if (i === winNomber) {
				cards[i].classList.add('main-cards-item-active');
			}
		}		
	}


  //нажатие на кнопку "провести честное голосование"
  votingBtn.addEventListener('click', () => {
  	let result = [];
  	randomVoices(result, 0);
  	showResults(result);
  });

   //нажатие на кнопку "вмешаться в выборы"
  crimeBtn.addEventListener('click', () => {
  	let chitResult = [];
  	randomVoices(chitResult, 25);
  	showResults(chitResult);
  });

});
