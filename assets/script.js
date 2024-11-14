const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

// Ambil semua item menu sidebar
const menuLinks = document.querySelectorAll('#sidebar .side-menu.top li a');
const pages = document.querySelectorAll('main .page');

// Fungsi untuk mengubah halaman
function changePage(pageId) {
	// Sembunyikan semua halaman
	pages.forEach(page => {
		page.classList.remove('active');
	});
	// Tampilkan halaman yang sesuai dengan ID
	const targetPage = document.getElementById(pageId);
	if (targetPage) {
		targetPage.classList.add('active');
	}
}

// Tambahkan event listener ke setiap item menu
menuLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault(); // Cegah link default

		// Hapus kelas 'active' dari semua menu item
		menuLinks.forEach(link => link.parentElement.classList.remove('active'));
		// Tambahkan kelas 'active' ke menu item yang diklik
		link.parentElement.classList.add('active');

		// Ganti halaman sesuai dengan menu yang diklik
		const pageId = link.getAttribute('data-page');
		changePage(pageId);
	});
});
