var allData = JSON.parse(localStorage.getItem("allData"));
var books = allData.books;
var booksFiltered = books;
var $booksContainer = document.querySelector(".main-library-cards");
booksFilter();

var $librarySearchForm = document.getElementById("librarySearchForm");
$librarySearchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let $searchBook = document.getElementById("searchBook");
	let searchBook = $searchBook.value.toString().toLowerCase();
	booksFiltered = books.filter((element) =>
		element.tittle.toLowerCase().includes(searchBook)
	);
	bookReorder();
});

function booksFilter() {
	$booksContainer.innerHTML = "";
	booksFiltered.forEach((element) => {
		let $BookCard = document.createElement("div");
		let $BookCardCover = document.createElement("img");
		let $BookCardTitle = document.createElement("p");
		$BookCard.classList.add("book-card");
		$BookCard.onclick = () => {
			let $modalContainer = document.getElementById("modalContainer");
			let $modalBookCover = document.getElementById("modalBookCover");
			let $modalBookTittle = document.getElementById("modalBookTittle");
			let $modalBookSynopsis = document.getElementById("modalBookSynopsis");
			let $modalBookAuthor = document.getElementById("modalBookAuthor");
			let $modalBookGenre = document.getElementById("modalBookGenre");
			let $modalBookDate = document.getElementById("modalBookDate");
			$modalContainer.classList.add("show-modal");
			$modalBookCover.src = element.image;
			$modalBookTittle.textContent = element.tittle;
			$modalBookSynopsis.textContent = element.synopsis;
			$modalBookAuthor.textContent = element.author;
			$modalBookGenre.textContent = element.genre;
			$modalBookDate.textContent = element.systemEntryDate;
		};
		$BookCardCover.src = element.image;
		$BookCardTitle.textContent = element.tittle;
		$booksContainer.appendChild($BookCard);
		$BookCard.appendChild($BookCardCover);
		$BookCard.appendChild($BookCardTitle);
	});
}

function closeModal() {
	let $modalContainer = document.getElementById("modalContainer");
	$modalContainer.classList.remove("show-modal");
}

function bookReorder() {
	let $filterGenre = document.getElementById("filterGenre");
	let filterGenre = $filterGenre.value.toString().toLowerCase();
	if (!filterGenre) booksFiltered = books;
	else {
		booksFiltered = books.filter(
			(element) => element.genre.toLowerCase() == filterGenre
		);
	}
	booksFilter();
}
