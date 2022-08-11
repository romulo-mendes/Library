/* let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let $userLogged = document.getElementById("userLogged");
let $userLogout = document.getElementById("userLogout");
var userEmail;
if (queryString) {
	userEmail = urlParams.get("user");
}

$userLogged.children[1].textContent = userEmail;
$userLogged.onclick = () => {
	$userLogout.classList.toggle("show-display-block");
};

function userLogout() {
	window.location.assign("./index.html");
}
 */