let currentPage = 'home';
let currentBook = null;
let books = [];

const main = document.querySelector('main');

const pageListMainContent = `<h2 class="text-2xl font-bold mb-4">Daftar Buku Perpustakaan</h2>

<table class="min-w-full border border-gray-300">
  <thead>
    <tr>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Judul</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Penulis</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Tahun Terbit</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Jumlah</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-center">Action</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;

const pageEditBookMainContent = `<h2 class="text-2xl font-bold mb-4">Edit Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleEditForm(event)">
</form>
`;

const pageAddBookMainContent = `<h2 class="text-2xl font-bold mb-4">Tambah Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleAddForm(event)">
  <div class="mb-4">
    <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
    <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
    <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
    <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
    <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="flex justify-center">
    <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Tambah Buku" />
  </div>
</form>
`;

async function handleClickEditButton(bookId) {
  try {
    // Ambil data buku dari server berdasarkan id, simpan hasilnya ke variabel currentBook
    // TODO: answer here
    const response = await fetch(`http://localhost:3333/books/${bookId}`);
    currentBook = await response.json();

    currentPage = 'edit';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}
async function handleClickDeleteButton(bookId) {
  try {
    // const confirmation = confirm('Apakah anda yakin ingin menghapus buku ini?');
    // if (!confirmation) {
    //   return;
    // }

    //panggil function deleteBook dengan parameter bookId
    // TODO: answer here

    await deleteBook(bookId);

    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

// async function handleEditForm(event) {
//   try {
//     // gunakan preventDefault untuk mencegah browser melakukan reload halaman
//     // TODO: answer here
//     event.preventdefault();

//     /*
//       Ambil data dari form, simpan ke dalam variabel book
//       bentuknya seperti ini:
//       {
//         title: 'example judul',
//         author: 'example penulis',
//         year: 2020,
//         quantity: 10,
//       }
//     */
//     // TODO: answer here

//     // panggil function editBook dengan parameter book
//     // TODO: answer here

//     // const form = event.target;
//     // const id = currentBook.id; // Mengambil id dari currentBook
//     // const title = form.elements.title.value;
//     // const author = form.elements.author.value;
//     // const year = parseInt(form.elements.year.value);
//     // const quantity = parseInt(form.elements.quantity.value);

//     const book = {
//       title: document.getElementById('title').value,
//       author: document.getElementById('author').value,
//       year: document.getElementById('year').value,
//       quantity: document.getElementById('quantity').value,
//     };

//     await editBook(book);

//     currentBook = null;

//     currentPage = 'home';
//     loadPage();
//   } catch (error) {
//     console.log(error);
//     console.log('Terjadi kesalahan saat mengubah buku');
//   }
// }
async function handleEditForm(event) {
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here
    event.preventDefault();
    /* 
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    // TODO: answer here
    const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      year: document.getElementById('year').value,
      quantity: document.getElementById('quantity').value,
    };

    // panggil function editBook dengan parameter book
    // TODO: answer here
    await editBook(book);
    currentBook = null;

    // fetchBooks();

    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function handleAddForm(event) {
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here
    event.preventDefault();

    /*
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    // TODO: answer here
    const form = event.target;
    const titleInput = form.elements.title;
    const authorInput = form.elements.author;
    const yearInput = form.elements.year;
    const quantityInput = form.elements.quantity;

    const book = {
      title: titleInput.value,
      author: authorInput.value,
      year: parseInt(yearInput.value),
      quantity: parseInt(quantityInput.value),
    };

    // panggil function addBook dengan parameter book
    // TODO: answer here
    await addBook(book);

    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

function handleClickAddNav() {
  // ubah currentPage menjadi 'add'
  // TODO: answer here
  currentPage = 'add';
  loadPage();
}

// add event listener click tag a didalam li dengan function handleClickAddNav
//const navLinks = document.querySelectorAll('li a');
//navLinks.forEach((navLink) => {
// TODO: answer here
//navLinks.addEventListener('click', handleClickAddNav);
//});
const navLinks = document.querySelectorAll('li a');
navLinks.forEach((navLink) => {
  // TODO: answer here
  navLink.addEventListener('click', handleClickAddNav);
});

function generateRows(books) {
  let rows = '';
  if (books.length === 0) {
    rows = `<tr>
   <td colspan="6" class="px-6 py-4 border-b text-center">Tidak ada buku yang ditemukan</td>
</tr>`;
  } else {
    /*
      looping books, untuk setiap book, buat row seperti ini:
      <tr class="book-item">
        <td class="px-6 py-4 border-b">Judul Buku</td>
        <td class="px-6 py-4 border-b">Penulis Buku</td>
        <td class="px-6 py-4 border-b">Tahun Terbit</td>
        <td class="px-6 py-4 border-b">Jumlah Stok</td>
        <td class="px-6 py-4 border-b text-center">
          <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(BookId)">Edit</button>
          <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(BookId)">Hapus</button>  
        </td>
      </tr>
      Jangan lupa untuk ganti BookId dengan id dari book yang sedang di looping
      simpan row yang dibuat ke variabel rows
    */
    // TODO: answer here
    for (const book of books) {
      const { id, title, author, year, quantity } = book;
      const row = `
      <tr class="book-item">
          <td class="px-6 py-4 border-b">${title}</td>
          <td class="px-6 py-4 border-b">${author}</td>
          <td class="px-6 py-4 border-b">${year}</td>
          <td class="px-6 py-4 border-b">${quantity}</td>
          <td class="px-6 py-4 border-b text-center">
          <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(${id})">Edit</button>
          <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(${id})">Hapus</button>
          </td>
      </tr>`;
      rows += row;
    }
  }
  return rows;
}

function generateEditFormInput() {
  return `<div class="mb-4">
  <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
  <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.title}">
</div>
<div class="mb-4">
  <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
  <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.author}">
</div>
<div class="mb-4">
  <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
  <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.year}">
</div>
<div class="mb-4">
  <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
  <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.quantity}">
</div>
<div class="flex justify-center">
  <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="simpan" />
</div>`;
}

async function loadPage() {
  switch (currentPage) {
    case 'home':
      // panggil function fetchBooks
      // TODO: answer here
      await fetchBooks();

      main.innerHTML = pageListMainContent;

      console.log('test');
      const tableBody = document.querySelector('tbody');
      /* 
        panggil function generateRows dengan parameter books dan simpan hasilnya ke variabel rows
        kemudian isi innerHTML dari tableBody dengan rows
      */
      // TODO: answer here
      rows = generateRows(books);
      console.log(rows);
      tableBody.innerHTML = rows;

      break;
    case 'edit':
      main.innerHTML = pageEditBookMainContent;

      const form = document.querySelector('form');

      /* 
        panggil function generateEditFormInput dan simpan hasilnya ke variabel formInput
        kemudian isi innerHTML dari form dengan formInput
      */
      // TODO: answer here
      const formInput = generateEditFormInput();
      form.innerHTML = formInput;
      break;
    case 'add':
      main.innerHTML = pageAddBookMainContent;
      break;
  }
}

async function fetchBooks() {
  try {
    /* 
      fetch data buku dari http://localhost:3333/books
      simpan hasilnya ke variabel global books
    */
    // TODO: answer here
    const response = await fetch('http://localhost:3333/books');
    books = await response.json();
    return books;
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}

async function addBook(book) {
  try {
    /* 
      tambahkan buku baru ke http://localhost:3333/books dengan method POST
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
    // TODO: answer here
    const response = await fetch('http://localhost:3333/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Gagal menambahkan buku');
    }

    console.log('Buku berhasil ditambahkan');
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

// async function editBook(book) {
//   try {
//     /*
//       ubah buku yang ada di http://localhost:3333/books/:id dengan method PUT
//       body yang dikirim adalah book yang dikirimkan sebagai parameter function
//     */
//     // TODO: answer here
//     const res = await fetch(`http://localhost:3333/books/${currentBook.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(book),
//     });

//     const result = await res.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//     console.log('Terjadi kesalahan saat mengubah buku');
//   }
// }

async function editBook(book) {
  try {
    /* 
      ubah buku yang ada di http://localhost:3333/books/:id dengan method PUT
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
    // TODO: answer here
    const res = await fetch(`http://localhost:3333/books/${currentBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function deleteBook(bookId) {
  try {
    /* 
      hapus buku yang ada di http://localhost:3333/books/:id dengan method DELETE
      id buku yang akan dihapus dikirimkan sebagai parameter function
    */
    // TODO: answer here
    await fetch(`http://localhost:3333/books/${bookId}`, {
      method: 'DELETE',
    });

    console.log('Buku berhasil dihapus');
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

loadPage();
