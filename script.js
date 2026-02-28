// 1. Mengambil elemen HTML yang diperlukan
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// 2. Fungsi untuk menambahkan tugas
function addTask() {
    // Jika input kosong, tampilkan pesan alert
    if(inputBox.value === ''){
        alert("You have to write something!");
    }
    else {
        // Membuat elemen <li> (list item)
        let li = document.createElement("li");
        
        // Mengisi teks di dalam <li> dengan nilai dari input
        li.innerHTML = inputBox.value;
        
        // Menambahkan <li> ke dalam <ul> (listContainer)
        listContainer.appendChild(li);

        // Membuat tombol hapus (span)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Simbol X
        li.appendChild(span);
    }
    
    // Mengosongkan input setelah menambah tugas
    inputBox.value = "";
    
    // Menyimpan data (fitur tambahan opsional untuk pemula)
    saveData();
}

// 3. Menambahkan event listener untuk klik pada list
// Ini menggunakan "Event Delegation" agar bisa mengatur klik pada semua item baru maupun lama
listContainer.addEventListener("click", function(e) {
    
    // Jika yang diklik adalah elemen <li> (biasanya teks tugas)
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle kelas 'checked' (coret)
        saveData();
    }
    
    // Jika yang diklik adalah elemen <span> (tombol hapus)
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Hapus elemen <li> parent-nya
        saveData();
    }
}, false);

// 4. FungsiEnter pada keyboard
// Agar bisa menambah tugas hanya dengan menekan tombol Enter
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// --- Fitur Penyimpanan Data (Local Storage) ---
// Ini membuat tugas tidak hilang saat halaman di-refresh

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Panggil fungsi ini saat halaman dibuka agar data sebelumnya muncul
showTask();