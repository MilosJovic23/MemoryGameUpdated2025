
$(document).ready(function () {

	let cards = $(".cards");
	let filpedCards = [];
	let cardsContainer = $(".cardsContainer");
	let canFlip = true;

	function flipCard() {
		if (!canFlip) return;

		$(this).addClass("flip");
		filpedCards.push( $(this).attr("data") );
		localStorage.setItem( "filpedCards", JSON.stringify( filpedCards ) );

		if ( filpedCards.length === 2 ) {
			canFlip = false;
			CheckMatch();
		}
	}

	function CheckMatch() {

		let selectedCard  = JSON.parse(localStorage.getItem("filpedCards"));
		if (selectedCard[0] !== selectedCard[1]) {
			setTimeout( resetFlipCards, 1000);
		} else {
			filpedCards = [];
			canFlip = true;
		}
	}

	function resetFlipCards() {
		$(".flip").removeClass("flip");
		localStorage.clear();
		filpedCards = [];
		canFlip = true;
	}

	function suffleDivs() {

		cardsContainer.each(function () {
			var divs = $(this).find("div");
			let i = divs.length,
				j,
				temp;
			for (let i = 0; i < divs.length; i++) {
				$(divs[i]).remove();
			}

			while (--i > 0) {
				j = Math.floor(Math.random() * (i + 1));
				temp = divs[j];
				divs[j] = divs[i];
				divs[i] = temp;
			}
			for (let i = 0; i < divs.length; i++) {
				$(divs[i]).appendTo(this);
			}
			resetCards();
			let span = $(this).find("span");
			$(span).appendTo(this);

		});
	}

	function resetCards(){
		cards.removeClass("flip");
		cards.each(function () {
			$(this).on("click", flipCard);
		});
	}

	cards.each(function () {
		$(this).on("click", flipCard);
	});
	$("#newGameButton").click(suffleDivs);

});
