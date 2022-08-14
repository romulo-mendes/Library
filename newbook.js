var allData = JSON.parse(localStorage.getItem("allData"));
var $newBook = document.getElementById("newBook");
let $bookCover = document.getElementById("bookCover");
let $bookTitle = document.getElementById("bookTitle");
let $bookSynopsis = document.getElementById("bookSynopsis");
let $bookAuthor = document.getElementById("bookAuthor");
let $bookGenre = document.getElementById("bookGenre");
let $bookEntry = document.getElementById("bookEntry");
var $labelFileCenter = document.querySelector(".labelFileCenter");
let $newBookCancelBtn = document.getElementById("newBookCancelBtn");
var SaveUrl;

$newBook.addEventListener("submit", (e) => {
	e.preventDefault();

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
			status: { description: "", isActive: true },
			image: SaveUrl,
			synopsis: $bookSynopsis.value,
			systemEntryDate: new Date($bookEntry.value).toLocaleDateString("pt-br"),
			tittle: $bookTitle.value,
		};
		allData.books.push(newBook);
		localStorage.setItem("allData", JSON.stringify(allData));
		alert("Livro cadastrado com sucesso!");
		window.location.assign("./home.html");
	}
});

function changePreview(teste) {
	const file = teste.files[0];

	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("loadend", () => {
			const urlImg = reader.result;
			SaveUrl = urlImg;
			teste.style.backgroundImage = "url(" + urlImg + ")";
			teste.style.backgroundSize = "cover";
			$labelFileCenter.style.display = "none";
		});
	} else $labelFileCenter.style.display = "block";
}

$newBookCancelBtn.onclick = () => window.location.assign("./home.html");
