var allData = JSON.parse(localStorage.getItem("allData"));
var $newBook = document.getElementById("newBook");
console.log(allData);

$newBook.addEventListener("submit", (e) => {
	e.preventDefault();
	let $bookCover = document.getElementById("bookCover");
	let $bookTitle = document.getElementById("bookTitle");
	let $bookSynopsis = document.getElementById("bookSynopsis");
	let $bookAuthor = document.getElementById("bookAuthor");
	let $bookGenre = document.getElementById("bookGenre");
	let $bookEntry = document.getElementById("bookEntry");
	console.log($bookCover.value);
	if (
		!$bookCover.value ||
		!$bookTitle.value ||
		!$bookSynopsis.value ||
		!$bookAuthor.value ||
		!$bookGenre.value ||
		!$bookEntry.value
	) {
		alert("Preencha todos os campos antes de continuar");
	} else {
		let newBook = {
			author: $bookAuthor.value,
			genre: $bookGenre.value,
			rentHistory: [],
			status: [{ description: "", isActive: true }],
			image: $bookCover.value,
			synopsis: $bookSynopsis.value,
			systemEntryDate: $bookEntry.value,
			tittle: $bookTitle.value,
		};
		allData.books.push(newBook);
		localStorage.setItem("allData", JSON.stringify(allData));
		alert("Livro cadastrado com sucesso!");
		window.location.assign("./home.html");
	}
});

function newBookCancelBtn() {
	window.location.assign("./home.html");
}
