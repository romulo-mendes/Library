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
let $trLastRent = document.getElementById("trRentHistory");
let $modalInactiveBook = document.getElementById("modalInactiveBook");
let $formInactive = document.getElementById("formInactive");
let $inactiveTxt = document.getElementById("inactiveTxt");
let $inactiveShowText = document.getElementById("inactiveShowText");
let $modalInactivateBtn = document.getElementById("modalInactivateBtn");
let $modalInactiveInfo = document.getElementById("modalInactiveInfo");

let url;

let allData = JSON.parse(localStorage.getItem("allData"));
let books = allData.books;
let booksFiltered = books;
showBooks();

$lentBookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let bookIndex = $modalBook.dataset.index;
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
		allData.books[bookIndex].rentHistory.push(rentHistory);
		localStorage.setItem("allData", JSON.stringify(allData));
		alert("Livro emprestado com sucesso!");
		closeModalLent();
		closeModal();
	}
});

$librarySearchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let filterGenre = $filterGenre.value;
	let searchBook = $searchBook.value.toString().toLowerCase();
	booksFiltered = books.filter((element, bookIndex) =>
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
			$modalContainer.classList.add("show-display-flex");
			$modalBook.classList.add("show-display-flex");
			$modalBookCover.src = element.image;
			$modalBookTittle.textContent = element.tittle;
			$modalBookSynopsis.textContent = element.synopsis;
			$modalBookAuthor.textContent = element.author;
			$modalBookGenre.textContent = element.genre;
			$modalBookDate.textContent = element.systemEntryDate;
			books.forEach((book, index) => {
				if (element.tittle == book.tittle)
					$modalBook.setAttribute("data-index", index);
			});
			$modalBook.setAttribute("data-number", bookIndex);
			checkIsActive();
			checkModalBook();
		};
		$BookCardCover.src = element.image;
		$BookCardTitle.textContent = element.tittle;
		$BookCard.appendChild($BookCardCover);
		$BookCard.appendChild($BookCardTitle);
		$booksContainer.appendChild($BookCard);
	});
}

function closeModal() {
	$modalRentHistory.classList.remove("show-display-block");
	$lentBookBtn.classList.add("lent-book-btn-disabled");
	$modalContainer.classList.remove("show-display-flex");
}
function lendBook() {
	$modalBook.classList.remove("show-display-flex");
	$lentBook.classList.add("show-display-flex");
}

function closeModalLent() {
	$lentBook.classList.remove("show-display-flex");
	$modalBook.classList.add("show-display-flex");
}

function checkModalBook() {
	let bookIndex = $modalBook.dataset.number;
	let bookStatus = booksFiltered[bookIndex].status.isActive;
	if (booksFiltered[bookIndex].rentHistory.length > 0 && bookStatus == true) {
		$modalInactiveInfo.classList.remove("show-display-block");
		showLastRent();
	} else if (bookStatus == false) {
		$modalInactiveInfo.classList.add("show-display-block");
		$inactiveShowText.textContent = booksFiltered[bookIndex].status.description;
		$lentBookBtn.disabled = true;
	} else {
		$modalInactiveInfo.classList.remove("show-display-block");
		$lentBookBtn.classList.remove("lent-book-btn-disabled");
		$modalRentHistory.classList.remove("show-display-block");

		$lentBookBtn.innerHTML =
			"<img src='./img/library/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg' alt='Ícone de livro aberto' />Emprestar";
		/* $lentBookBtn.onclick = lendBook(); */
	}
}

function showLastRent() {
	let bookIndex = $modalBook.dataset.number;
	$trLastRent.innerHTML = "";
	let currentDate = new Date();
	let rentHistory = booksFiltered[bookIndex].rentHistory;
	let lastRentDate = rentHistory[rentHistory.length - 1].deliveryDate;
	let lastRent = rentHistory[rentHistory.length - 1];
	/* lastRentDate = new Date(lastRentDate.split("/").reverse().join("-")); */
	lastRentDate = new Date(lastRentDate);
	let day = lastRentDate.getDate();
	let month = lastRentDate.getMonth();
	let year = lastRentDate.getFullYear();
	lastRentDate = new Date(year, month, day);
	if (lastRentDate > currentDate) {
		$modalRentHistory.classList.add("show-display-block");
		for (const property in lastRent) {
			let $th = document.createElement("th");
			$th.textContent = lastRent[property];
			$trLastRent.appendChild($th);
		}
		$lentBookBtn.classList.add("lent-book-btn-disabled");
		$lentBookBtn.innerHTML =
			"<img src='./img/library/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg' alt='Ícone de livro aberto' />Devolver";
		$lentBookBtn.onclick = returnBook();
	} else {
		$lentBookBtn.classList.remove("lent-book-btn-disabled");
		$modalRentHistory.classList.remove("show-display-block");
		$lentBookBtn.innerHTML =
			"<img src='./img/library/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg' alt='Ícone de livro aberto' />Emprestar";
		$lentBookBtn.onclick = "lendBook()";
	}
}
function returnBook() {
	console.log("ok");
}
function historyBook() {
	let bookIndex = $modalBook.dataset.number;
	let currentBook = booksFiltered[bookIndex].rentHistory;
	$modalBook.classList.remove("show-display-flex");
	$tbodyModalAllRentHistory.innerHTML = "";
	$modalAllRentHistory.classList.add("show-display-block");
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
	$modalBook.classList.add("show-display-flex");
	$modalAllRentHistory.classList.remove("show-display-block");
}

function editBook() {
	let bookIndex = $modalBook.dataset.index;
	url = "./edit.html?id=" + bookIndex;
	window.location.assign(url);
}

function inactivateBook() {
	$modalBook.classList.remove("show-display-flex");
	$modalInactiveBook.classList.add("show-display-block");
}
function closeInactiveModal() {
	$modalInactiveBook.classList.remove("show-display-block");
	$modalBook.classList.add("show-display-flex");
}

$formInactive.addEventListener("submit", (e) => {
	e.preventDefault();
	let bookIndex = $modalBook.dataset.index;
	allData.books[bookIndex].status.isActive = false;
	allData.books[bookIndex].status.description = $inactiveTxt.value;
	localStorage.setItem("allData", JSON.stringify(allData));
	alert("Livro inativado com sucesso!");
	closeInactiveModal();
});

function checkIsActive() {
	let bookIndex = $modalBook.dataset.number;
	if (booksFiltered[bookIndex].status.isActive == false) {
		$lentBookBtn.disabled = true;
		$lentBookBtn.classList.add("btn-inactive");
		$lentBookBtn.classList.remove("lent-book-btn-disabled");
	} else {
		$lentBookBtn.disabled = false;
		$lentBookBtn.classList.remove("btn-inactive");
	}
}
