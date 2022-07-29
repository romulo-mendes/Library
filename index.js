var $loginForm = document.getElementById("login-form");
$loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const response = await fetch("./data.json");
	var allData = await response.json();
	localStorage.setItem("allData", JSON.stringify(allData.data));
	console.log(allData);
	var users = allData.data.login;

	let $loginUser = document.getElementById("loginUser");
	let $loginPass = document.getElementById("loginPass");

	if (!$loginUser.value || !$loginPass.value)
		return alert("Preencha todos os campos antes de continuar");
	const userChecked = users.some(
		(element) =>
			element.email == $loginUser.value && element.password == $loginPass.value
	);
	if (!userChecked) return alert("Usuário ou senha inválido");

	window.location.assign("./home.html");
});
