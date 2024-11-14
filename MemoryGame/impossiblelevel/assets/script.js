const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const columns = 8; // Jumlah kolom 8
    const rows = 5;    // Jumlah baris 5
    const totalCards = columns * rows; // Total kartu akan menjadi 8x5 = 40

    if (totalCards % 2 !== 0) {
        throw new Error("Total cards must be an even number.");
    }

    // Array gambar untuk kartu memori (harus cukup untuk 20 pasang gambar)
    const images = [
        'assets/images/banteng.jpg', 
        'assets/images/belanda.jpg', 
        'assets/images/beringin.jpg', 
        'assets/images/bintang.jpg', 
        'assets/images/indoensia.jpg', 
        'assets/images/jepang.jpg', 
        'assets/images/padi.jpg', 
        'assets/images/rantai.jpg',
        'assets/images/sarekatislam.jpg',
        'assets/images/budiutomo.jpg',
        'assets/images/tamansiswa.jpg',
        'assets/images/muhammadiyah.jpg',
        'assets/images/pki.jpg',
        'assets/images/kurangtau.jpg',
        'assets/images/pewanas.jpg',
        'assets/images/soekarno.jpg',
        'assets/images/hadikusumo.jpg',
        'assets/images/radjiman.jpg',
        'assets/images/agussalim.jpg',
        'assets/images/hatta.jpg'

    ];

    // Pilih 20 gambar untuk dijadikan pasangan
    const picks = pickRandom(images, totalCards / 2); 
    const items = shuffle([...picks, ...picks]); // Duplikasi dan acak pasangan kartu

    const cards = `
        <div class="board" style="grid-template-columns: repeat(${columns}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${item}" alt="Memory card" width="20" height="20" />
                    </div>
                </div>
            `).join('')}
       </div>
    `;

    const parser = new DOMParser().parseFromString(cards, 'text/html');
    selectors.board.replaceWith(parser.querySelector('.board'));
};



const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++;
    state.totalFlips++;

    if (!state.gameStarted) {
        startGame();
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped');
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');

        // Cek apakah dua kartu yang dibalik memiliki gambar yang sama berdasarkan src
        if (flippedCards[0].querySelector('img').src === flippedCards[1].querySelector('img').src) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            flipBackCards();
        }, 1000);
    }
    
    // Cek jika semua kartu sudah dipasangkan
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `;

            clearInterval(state.loop);
        }, 1000);
    }
};

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()