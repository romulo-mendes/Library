var allData = JSON.parse(localStorage.getItem("allData"));
var books = allData.books;
var booksFiltered = books;
var $booksContainer = document.querySelector(".main-library-cards");
showBooks();

var $librarySearchForm = document.getElementById("librarySearchForm");
$librarySearchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let $searchBook = document.getElementById("searchBook");
	let $filterGenre = document.getElementById("filterGenre");
	let filterGenre = $filterGenre.value;
	let searchBook = $searchBook.value.toString().toLowerCase();
	console.log(booksFiltered);
	booksFiltered = books.filter((element) =>
		element[filterGenre].toLowerCase().includes(searchBook)
	);
	console.log(booksFiltered);
	showBooks();
});

function showBooks() {
	$booksContainer.innerHTML = "";
	booksFiltered.forEach((element, bookIndex) => {
		let $BookCard = document.createElement("div");
		let $BookCardCover = document.createElement("img");
		let $BookCardTitle = document.createElement("p");
		let $modalBook = document.querySelector(".modal-book");
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
			$modalBook.classList.add("show-modal");
			$modalBookCover.src = element.image;
			$modalBookTittle.textContent = element.tittle;
			$modalBookSynopsis.textContent = element.synopsis;
			$modalBookAuthor.textContent = element.author;
			$modalBookGenre.textContent = element.genre;
			$modalBookDate.textContent = element.systemEntryDate;
			$modalBook.setAttribute("data-number", bookIndex);
		};

		$BookCardCover.src = element.image;
		$BookCardTitle.textContent = element.tittle;
		$BookCard.appendChild($BookCardCover);
		$BookCard.appendChild($BookCardTitle);
		$booksContainer.appendChild($BookCard);
	});
}

function closeModal() {
	let $modalContainer = document.getElementById("modalContainer");
	$modalContainer.classList.remove("show-modal");
}

function lendBook() {
	let $modalBook = document.querySelector(".modal-book");
	let $lentBook = document.getElementById("lentBook");
	let $lentBookForm = document.getElementById("lentBookForm");
	$modalBook.classList.remove("show-modal");
	$lentBook.classList.add("show-modal");
	$lentBookForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let bookIndex = $modalBook.dataset.number;
		let rentHistory = {};
		let $studentName = document.getElementById("studentName");
		let $studentClass = document.getElementById("studentClass");
		let $withdrawalDate = document.getElementById("withdrawalDate");
		let $deliveryDate = document.getElementById("deliveryDate");
		if (
			!$studentName.value ||
			!$studentClass.value ||
			!$withdrawalDate.value ||
			!$deliveryDate.value
		)
			alert("Preencha todos os campos antes de continuar");
		else {
			rentHistory.studentName = $studentName.value;
			rentHistory.class = $studentClass.value;
			rentHistory.withdrawalDate = $withdrawalDate.value;
			rentHistory.deliveryDate = $deliveryDate.value;
			booksFiltered[bookIndex].rentHistory.push(rentHistory);
			allData.books = booksFiltered;
			localStorage.setItem("allData", JSON.stringify(allData));
			alert("Livro emprestado com sucesso!");
			closeModalLent();
		}
	});
}

function closeModalLent() {
	let $modalBook = document.querySelector(".modal-book");
	let $lentBook = document.getElementById("lentBook");
	$lentBook.classList.remove("show-modal");
	$modalBook.classList.add("show-modal");
}
