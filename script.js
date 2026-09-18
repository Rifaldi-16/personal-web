const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('status');
const btnSubmit = document.getElementById('btn-submit');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Mengirim...';
    statusDiv.innerText = '';
    statusDiv.className = 'status-msg';

    const data = new FormData(event.target);

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusDiv.innerText = 'Pesan Anda berhasil terkirim!';
            statusDiv.classList.add('success');
            form.reset(); // Mengosongkan form
        } else {
            statusDiv.innerText = 'Gagal mengirim pesan, silakan coba lagi.';
            statusDiv.classList.add('error');
        }
    } catch (error) {
        statusDiv.innerText = 'Terjadi kesalahan jaringan/koneksi.';
        statusDiv.classList.add('error');
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Kirim Pesan';
    }
});