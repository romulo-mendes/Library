/*Login */

var $loginForm = document.getElementById("login-form");
$loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const response = await fetch("./data.json");
	var allData = await response.json();
	var users = allData.data.login;

	let $loginUser = document.getElementById("loginUser");
	let $loginPass = document.getElementById("loginPass");

	if (!$loginUser.value || !$loginPass.value) {
		return alert("Preencha todos os campos antes de continuar");
	} else {
		users.filter((element) => {
			if (
				element.email == $loginUser.value &&
				element.password == $loginPass.value
			) {
				window.location.assign("./home.html");
				return;
			}
		});
	}
	alert("Usuário ou senha inválido");
});
