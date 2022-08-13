let queryString = window.location.search;
let $userLogged = document.getElementById("userLogged");
let $userLogout = document.getElementById("userLogout");
let userEmail;
let urlParams = new URLSearchParams(queryString);
if (urlParams.has("user")) {
	let userEmail = urlParams.get("user");
	localStorage.setItem("user", userEmail);
	showUserName(userEmail);
} else {
	userEmail = localStorage.getItem("user");
	showUserName(userEmail);
}

function userLogout() {
	localStorage.removeItem("user");
	window.location.assign("./index.html");
}

function showUserName(userEmail) {
	$userLogged.children[1].textContent = userEmail;
	$userLogged.onclick = () => {
		$userLogout.classList.toggle("show-display-block");
	};
}
