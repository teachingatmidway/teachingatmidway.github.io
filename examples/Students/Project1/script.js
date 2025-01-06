function login(){
	let username = document.getElementById("username").value;
	let pass = document.getElementById("pass").value;
	var spinner = document.getElementById("spinner");
	
	spinner.style.display = "block";
	
	function loginProcess(){
		if (username=="Mobile Computing" && pass=="CS 410") {
		window.location.href="home.html";
		}else{
			document.getElementById("err_message").innerHTML = "**Invalid Username or Password**";
			spinner.style.display = 'none';
		}
	}
	setTimeout(loginProcess, 1500);
}