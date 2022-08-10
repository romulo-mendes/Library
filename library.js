let $booksContainer = document.querySelector(".main-library-cards");
let $modalBook = document.querySelector(".modal-book");
let $modalContainer = document.getElementById("modalContainer");
let $modalRentHistory = document.getElementById("modalRentHistory");
let $lentBookBtn = document.getElementById("lentBookBtn");
let $lentBook = document.getElementById("lentBook");
let $modalAllRentHistory = document.getElementById("modalAllRentHistory");
let $tbodyModalAllRentHistory = document.getElementById("tbodyModalAllRentHistory");
let $searchBook = document.getElementById("searchBook");
let $filterGenre = document.getElementById("filterGenre");
let $librarySearchForm = document.getElementById("librarySearchForm");
let $modalBookCover = document.getElementById("modalBookCover");
let $modalBookTittle = document.getElementById("modalBookTittle");
let $modalBookSynopsis = document.getElementById("modalBookSynopsis");
let $modalBookAuthor = document.getElementById("modalBookAuthor");
let $modalBookGenre = document.getElementById("modalBookGenre");
let $modalBookDate = document.getElementById("modalBookDate");
let $studentName = document.getElementById("studentName");
let $studentClass = document.getElementById("studentClass");
let $withdrawalDate = document.getElementById("withdrawalDate");
let $deliveryDate = document.getElementById("deliveryDate");
let $lentBookForm = document.getElementById("lentBookForm");
let $tr = document.getElementById("trRentHistory");
let url;

let allData = JSON.parse(localStorage.getItem("allData"));
let books = allData.books;
let booksFiltered = books;
showBooks();

$lentBookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let bookIndex = $modalBook.dataset.number;
	let rentHistory = {};

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
		rentHistory.withdrawalDate = new Date($withdrawalDate.value).toLocaleDateString(
			"pt-br"
		);
		rentHistory.deliveryDate = new Date($deliveryDate.value).toLocaleDateString(
			"pt-br"
		);
		$studentName.value = "";
		$studentClass.value = "";
		$withdrawalDate.value = "";
		$deliveryDate.value = "";
		booksFiltered[bookIndex].rentHistory.push(rentHistory);
		allData.books = booksFiltered;
		localStorage.setItem("allData", JSON.stringify(allData));
		alert("Livro emprestado com sucesso!");
		closeModalLent();
	}
});

$librarySearchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let filterGenre = $filterGenre.value;
	let searchBook = $searchBook.value.toString().toLowerCase();
	booksFiltered = books.filter((element) =>
		element[filterGenre].toLowerCase().includes(searchBook)
	);
	showBooks();
});

function showBooks() {
	$booksContainer.innerHTML = "";
	booksFiltered.forEach((element, bookIndex) => {
		let $BookCard = document.createElement("div");
		let $BookCardCover = document.createElement("img");
		let $BookCardTitle = document.createElement("p");

		$BookCard.classList.add("book-card");
		$BookCard.onclick = () => {
			$modalContainer.classList.add("show-modal");
			$modalBook.classList.add("show-modal");
			$modalBookCover.src = element.image;
			$modalBookTittle.textContent = element.tittle;
			$modalBookSynopsis.textContent = element.synopsis;
			$modalBookAuthor.textContent = element.author;
			$modalBookGenre.textContent = element.genre;
			$modalBookDate.textContent = element.systemEntryDate;
			$modalBook.setAttribute("data-number", bookIndex);
			checkLentBtn();
		};

		$BookCardCover.src = element.image;
		$BookCardTitle.textContent = element.tittle;
		$BookCard.appendChild($BookCardCover);
		$BookCard.appendChild($BookCardTitle);
		$booksContainer.appendChild($BookCard);
	});
}

function closeModal() {
	$modalRentHistory.classList.remove("show-rent-history");
	$lentBookBtn.classList.add("lent-book-btn-disabled");
	$modalContainer.classList.remove("show-modal");
}
function lendBook() {
	$modalBook.classList.remove("show-modal");
	$lentBook.classList.add("show-modal");
}

function closeModalLent() {
	$lentBook.classList.remove("show-modal");
	$modalBook.classList.add("show-modal");
}

function checkLentBtn() {
	let bookIndex = $modalBook.dataset.number;
	if (booksFiltered[bookIndex].rentHistory.length > 0) {
		$tr.innerHTML = "";
		let currentDate = new Date().toLocaleDateString("pt-br");
		let rentHistory = booksFiltered[bookIndex].rentHistory;
		let lastRentDate = rentHistory[rentHistory.length - 1].deliveryDate;
		let lastRent = rentHistory[rentHistory.length - 1];
		lastRentDate = new Date(lastRentDate).toLocaleDateString("pt-br");
		if (lastRentDate > currentDate) {
			$modalRentHistory.classList.add("show-rent-history");
			for (const property in lastRent) {
				let $th = document.createElement("th");
				$th.textContent = lastRent[property];
				$tr.appendChild($th);
			}
			$lentBookBtn.classList.add("lent-book-btn-disabled");
			$lentBookBtn.innerHTML =
				"<img src='./img/library/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg' alt='Ícone de livro aberto' />Devolver";
		} else {
			$lentBookBtn.classList.remove("lent-book-btn-disabled");
			$modalRentHistory.classList.remove("show-rent-history");
			$lentBookBtn.innerHTML =
				"<img src='./img/library/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg' alt='Ícone de livro aberto' />Emprestar";
		}
	} else {
		$lentBookBtn.classList.remove("lent-book-btn-disabled");
		$modalRentHistory.classList.remove("show-rent-history");
		$lentBookBtn.innerHTML =
			"<img src='./img/library/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg' alt='Ícone de livro aberto' />Emprestar";
	}
}

function historyBook() {
	let bookIndex = $modalBook.dataset.number;
	let currentBook = booksFiltered[bookIndex].rentHistory;
	$modalBook.classList.remove("show-modal");
	$tbodyModalAllRentHistory.innerHTML = "";
	$modalAllRentHistory.classList.add("show-rent-history");
	currentBook.forEach((element) => {
		let $tr = document.createElement("tr");
		for (const property in element) {
			let $th = document.createElement("th");
			$th.textContent = element[property];
			$tr.appendChild($th);
		}
		$tbodyModalAllRentHistory.appendChild($tr);
	});
}

function filterHistory(property) {
	let bookIndex = $modalBook.dataset.number;
	let currentBook = booksFiltered[bookIndex].rentHistory;
	let inputFilterValue = property.value.toLowerCase();
	let fieldName = property.id.slice(0, property.id.length - 6);
	let currentBookFiltered = currentBook.filter((element) =>
		element[fieldName].toLowerCase().includes(inputFilterValue)
	);
	$tbodyModalAllRentHistory.innerHTML = "";
	currentBookFiltered.forEach((element) => {
		let $tr = document.createElement("tr");
		for (const property in element) {
			let $th = document.createElement("th");
			$th.textContent = element[property];
			$tr.appendChild($th);
		}
		$tbodyModalAllRentHistory.appendChild($tr);
	});
}

function closeHistoryBook() {
	$modalBook.classList.add("show-modal");
	$modalAllRentHistory.classList.remove("show-rent-history");
}

function editBook() {
	let bookIndex = $modalBook.dataset.number;
	url = "./edit.html?id=" + bookIndex;
	window.location.assign(url)
}
