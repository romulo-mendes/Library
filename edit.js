const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = urlParams.get("id");
let allData = JSON.parse(localStorage.getItem("allData"));
let books = allData.books;
let currentBook = books[bookId];

let $bookCover = document.getElementById("bookCover");
let $bookTitle = document.getElementById("bookTitle");
let $bookSynopsis = document.getElementById("bookSynopsis");
let $bookAuthor = document.getElementById("bookAuthor");
let $bookGenre = document.getElementById("bookGenre");
let $bookEntry = document.getElementById("bookEntry");
let $labelFileCenter = document.querySelector(".labelFileCenter");
let $editBookForm = document.getElementById("editBookForm");
let dataFormatada = currentBook.systemEntryDate.split("/").reverse().join("-");
let SaveUrl;

$bookTitle.value = currentBook.tittle;
$bookSynopsis.value = currentBook.synopsis;
$bookAuthor.value = currentBook.author;
$bookGenre.value = currentBook.genre;
$bookEntry.value = dataFormatada;
$bookCover.style.backgroundImage = "url(" + currentBook.image + ")";
$labelFileCenter.style.display = "none";

$editBookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log(allData.books[bookId].tittle);
	allData.books[bookId].tittle = $bookTitle.value;
	allData.books[bookId].synopsis = $bookSynopsis.value;
	allData.books[bookId].author = $bookAuthor.value;
	allData.books[bookId].genre = $bookGenre.value;
	allData.books[bookId].systemEntryDate = new Date(
		$bookEntry.value
	).toLocaleDateString("pt-br");
	allData.books[bookId].image = SaveUrl;
	localStorage.setItem("allData", JSON.stringify(allData));
	alert("Livro editado com sucesso!");
	window.location.assign("./library.html");
});
function changePreview(teste) {
	const file = teste.files[0];

	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("loadend", () => {
			let urlImg = reader.result;
			SaveUrl = urlImg;
			teste.style.backgroundImage = "url(" + urlImg + ")";
			teste.style.backgroundSize = "cover";
			$labelFileCenter.style.display = "none";
		});
	} else $labelFileCenter.style.display = "block";
}
