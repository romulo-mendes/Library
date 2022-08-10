let allData = JSON.parse(localStorage.getItem("allData"));
let books = allData.books;
let $historyTbody = document.getElementById("historyTbody");
let $tr = $historyTbody.getElementsByTagName("tr");

books.forEach((element) => {
	if (element.rentHistory.length > 0) {
		let bookTittle = element.tittle;
		let currentBook = element.rentHistory;
		currentBook.forEach((rent) => {
			let $tr = document.createElement("tr");
			let index = 0;
			for (const prop in rent) {
				index++;
				let $th = document.createElement("th");
				if (index === 3) {
					let $thTittle = document.createElement("th");
					$thTittle.textContent = bookTittle;
					$tr.appendChild($thTittle);
				}
				$th.textContent = rent[prop];
				$tr.appendChild($th);
			}
			$historyTbody.appendChild($tr);
		});
	}
});
function filterHistory(prop) {
	let indexTh = prop.dataset.id;
	let idField = prop.id;
	let $input = document.getElementById(idField);
	let inputValue = $input.value.toLowerCase();

	for (let i = 0; i < $tr.length; i++) {
		let $th = $tr[i].getElementsByTagName("th")[indexTh];
		if ($th) {
			let txtValue = $th.textContent;
			if (txtValue.toLowerCase().indexOf(inputValue) > -1) {
				$tr[i].style.display = "";
			} else {
				$tr[i].style.display = "none";
			}
		}
	}
}
