document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Gửi dữ liệu tới JSON server để xác thực
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Data:', data);
        let loginSuccess = false;

        data.forEach(user => {
          if (user.email === email && user.password === password) {
            loginSuccess = true;
            alert('Đăng nhập thành công');
            window.location.href = "../index.html";
            localStorage.setItem('isLoggedIn', 'true');
          }
        });

        if (!loginSuccess) {
          alert('Đăng nhập thất bại');
        }
      })
      .catch((error) => {
        alert('Đăng nhập thất bại');
        console.error("Error:", error);
      });
  });

  function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "../index.html";
  }