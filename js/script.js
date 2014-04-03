$(document).ready(function () {

	$("#slider-1 ul").bxSlider({
		minSlides: 3,
		maxSlides: 6,
		slideMargin: 35,
		slideWidth: "auto",
		moveSlides: 3,
		pager: false,
		nextSelector: "#slider-1 .next",
		prevSelector: "#slider-1 .prev"
	})

	/**
	 * Аккордион
	 */

	$("#questions").accordion({
		header: "> li > h3",
		heightStyle: "content",
		icons: null

	});
	/**
	 * Всплывающие окна
	 */

	$(".popup").fancybox({
		padding: 0
	});

	/**
	 * Скролл меню
	 */

	// $("header[role=banner] nav").ddscrollSpy({
	// 	scrolltopoffset: -66
	// });


	/**
	 * Маска ввода
	 */

	$("[name=phone]").mask("+7(999) 999-99-99");


	/**
	 * Поддержка плейсхолдера в старых браузерах
	 */

	var placeholderSupport = "placeholder" in document.createElement("input");
	if (!placeholderSupport) {
		$.fn.placeholder = function () {
			$(this).each(function () {
				// высота линии равна высоте инпута
				var h = $(this).height() + 'px';
				if (!$(this).is("textarea")) {
					$(this).css("line-height", h);
				}

				var text = $(this).attr('placeholder');
				$(this).val(text);

				$(this).click(function () {
					var text = $(this).attr('placeholder');
					if ($(this).val() == text) {
						$(this).val("");
					}
				});
				$(this).blur(function () {
					var text = $(this).attr('placeholder');
					if ($(this).val() == "") {
						$(this).val(text);
					}
				});
			});
			$('form').submit(function () {
				// обнуляем значения на отправке формы
				$this = $(this);
				$(this).find("[placeholder]").each(function () {
					var text = $(this).attr('placeholder');
					if ($(this).val() == text) {
						$(this).val("");
					}
				});
				// стираем после отправки
				setTimeout(function () {
					$this.find("[placeholder]").each(function () {
						//console.log("settimeout");
						var text = $(this).attr('placeholder');
						if ($(this).val() == "") {
							$(this).val(text);
						}
					});
				}, 1000);
			});
		};
		$('[placeholder]').placeholder();
	}


	/**
	 * Отправка формы
	 */
	$("form").each(function () {
		$(this).validate({
			onfocusout: true,
			submitHandler: function (form) {
				var data = $(form).serialize();
				var action = $(form).attr("action");
				var answer = $.post(action, data).done(function (msg) {
					// если удачно
					if (msg == "") {
						$.fancybox.close();
						$.fancybox({
							href: "#thank-you",
							padding: 0
						});

						// Yandex METRIKA - поместите код яндекс метрики с достижением цели здесь.
						// Используйте $(form).attr("id") == "myFormId" для установки целей на нужные формы
						// setTimeout(function(){
						// 	$.fancybox.close();
						// }, 5000);
					}
					// если сервер выдал сообщение (ошибку итп)
					else {
						alert("Не удалось отправить заявку.\n Ответ сервера:\n" + msg);
					}
				}).fail(function () {
					// не удалось осуществить запрос
					alert("Произошла ошибка при отправке данных на сервер.");
				});
				return false;
			}
		});
	});


	/**
	 * Счетчик
	 */

	// Выберите дату - сегодня, если пустое значение
	var date = "";
	// или другую (var - должна быть объвлена 1 раз)
	// var date = "31 dec 2014";

	function getNewDate(date) {
		if (date) {
			var newDate = new Date(date);
		} else
			var newDate = new Date();
		// 12 ночи каждого дня
		newDate.setHours(24, 0, 0, 0);
		return newDate;
	}

	$(".countdown").countdown({
		until: getNewDate(date),
		layout: '\
		<div class="block">\
			<div class="num">{d10}</div>\
			<div class="num">{d1}</div>\
			<p>дней</p>\
		</div>\
		<div class="block">\
			<div class="num">{h10}</div>\
			<div class="num">{h1}</div>\
			<p>часов</p>\
		</div>\
		<div class="block">\
			<div class="num">{m10}</div>\
			<div class="num">{m1}</div>\
			<p>минут</p>\
		</div>\
		<div class="block">\
			<div class="num">{s10}</div>\
			<div class="num">{s1}</div>\
			<p>секунд</p>\
		</div>',
		onExpiry: function () {
			$(".countdown").countdown('option', {
				until: getNewDate(date)
			});
		}
	});


});

// настройки для плагина валидации форм
(function ($) {
	$.extend($.validator.messages, {
		required: "Это поле необходимо заполнить.",
		remote: "Пожалуйста, введите правильное значение.",
		email: "Пожалуйста, введите корректный адрес электронной почты.",
		url: "Пожалуйста, введите корректный URL.",
		date: "Пожалуйста, введите корректную дату.",
		dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
		number: "Пожалуйста, введите число.",
		digits: "Пожалуйста, вводите только цифры.",
		creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
		equalTo: "Пожалуйста, введите такое же значение ещё раз.",
		accept: "Пожалуйста, выберите файл с правильным расширением.",
		maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
		minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
		rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
		range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
		max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
		min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
	});
}(jQuery));