document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
      username: username,
      phone: phone,
      email: email,
      password: password,
    };

    // Gửi dữ liệu tới JSON server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Đăng ký thành công');
        // document.getElementById("registrationForm").reset();
        window.location.href = "../index.html";
      })
      .catch((error) => {
        alert('Đăng ký thất bại');
        console.error("Error:", error);
      });
  });