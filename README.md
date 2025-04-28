<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login Pro+</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <form id="form" class="form">
      <h2>Masuk</h2>

      <div class="input-group">
        <input type="text" name="username" id="username" placeholder="Username" required>
      </div>

      <div class="input-group password-group">
        <input type="password" name="password" id="password" placeholder="Password" required>
        <span id="togglePassword" class="toggle-eye">🔒</span>
      </div>

      <button type="submit" class="btn ripple">Kirim</button>

      <div id="loading" class="hidden">Mengirim data...</div>
    </form>
  </div>

  <!-- Toast Notification -->
  <div id="toast" class="toast hidden"></div>

  <script>
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwaJ9HV2wvFNVJvxcs2rTbhiUj72hCsBS0_JHlJUyjpPyYAt1Iq9clJ3yK5rGh_h7c/exec';
    const form = document.getElementById('form');
    const loading = document.getElementById('loading');
    const toast = document.getElementById('toast');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
  
    form.addEventListener('submit', e => {
      e.preventDefault();

      if (username.value.trim() === '' || password.value.trim() === '') {
        showToast('⚠️ Username dan Password wajib diisi!');
        return;
      }

      loading.classList.remove('hidden');

      fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => response.json())
      .then(data => {
        showToast('☑️ Data berhasil dikirim!');
        
        // Simpan username ke localStorage
        localStorage.setItem('username', username.value);

        setTimeout(() => {
          window.location.href = "beranda.html"; // Redirect ke beranda.html
        }, 1500); // Tunggu 1,5 detik untuk menampilkan toast
      })
      .catch(error => {
        showToast('❌ Terjadi kesalahan: ' + error.message);
      })
      .finally(() => {
        loading.classList.add('hidden');
      });
    });
  
    // Toggle password
    const togglePassword = document.getElementById('togglePassword');
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      togglePassword.textContent = type === 'password' ? '🔒' : '🔓';
    });
  
    // Toast function
    function showToast(message) {
      toast.textContent = message;
      toast.classList.remove('hidden');
      toast.classList.add('show');
  
      setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
      }, 3000);
    }
  
    // Ripple effect
    const buttons = document.querySelectorAll('.ripple');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
        circle.classList.add('ripple-effect');
        this.appendChild(circle);
  
        setTimeout(() => {
          circle.remove();
        }, 600);
      });
    });
  </script>
</body>
</html>

