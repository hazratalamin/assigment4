let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn'; // ডিফল্ট আইডি

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filteredCards = document.getElementById('filteredCards');

// ১. সংখ্যা আপডেট করার ফাংশন
function calculateCounts() {
    total.innerText = allCards.querySelectorAll('.card').length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectedList.length;
}
calculateCounts();

// ২. ফিল্টার বাটন টগল এবং রেন্ডার করার ফাংশন
function toggleStyle(id) {
    currentStatus = id;
    
    // বাটন স্টাইল রিসেট
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-gray-300');
    });

    const selected = document.getElementById(id);
    selected.classList.add('bg-[#3B82F6]', 'text-white');
    selected.classList.remove('bg-gray-300');

    // সেকশন শো/হাইড ও রেন্ডার লজিক
    if (id === 'all-filter-btn') {
        allCards.classList.remove('hidden');
        filteredCards.classList.add('hidden');
    } else if (id === 'interview-filter-btn') {
        allCards.classList.add('hidden');
        filteredCards.classList.remove('hidden');
        renderInterview();
    } else if (id === 'rejected-filter-btn') {
        allCards.classList.add('hidden');
        filteredCards.classList.remove('hidden');
        renderRejected();
    }
}

// ৩. মেইন ক্লিক ইভেন্ট (ইন্টারভিউ ও রিজেক্টেড বাটন হ্যান্ডলিং)
mainContainer.addEventListener('click', function (event) {
    const target = event.target;
    const parentNode = target.closest('.card'); 
    if (!parentNode) return;

    const title = parentNode.querySelector('h1').innerText;
    const statusDisplay = parentNode.querySelector('.status'); 

    if (target.classList.contains('interview-btn')) {
        // All Section কার্ড আপডেট
        if (statusDisplay) {
            statusDisplay.innerText = 'INTERVIEW';
            statusDisplay.className = 'status text-green-500 font-bold';
        }

        const cardInfo = { title, status: 'INTERVIEW' };
        if (!interviewList.find(item => item.title === title)) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.title !== title);
    } 
    else if (target.classList.contains('rejected-btn')) {
        // All Section কার্ড আপডেট
        if (statusDisplay) {
            statusDisplay.innerText = 'REJECTED';
            statusDisplay.className = 'status text-red-500 font-bold';
        }

        const cardInfo = { title, status: 'REJECTED' };
        if (!rejectedList.find(item => item.title === title)) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.title !== title);
    }

    calculateCounts();
    
    // ফিল্টার মুডে থাকলে লাইভ আপডেট দেখানো
    if (currentStatus === 'interview-filter-btn') renderInterview();
    if (currentStatus === 'rejected-filter-btn') renderRejected();
});

// ৪. ইন্টারভিউ সেকশন রেন্ডার করার ফাংশন
function renderInterview() {
    filteredCards.innerHTML = ''; 
    for (let job of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-200 rounded-[10px] p-5 bg-white';
        div.innerHTML = `
        <div class="space-y-2">
            <h1 class="text-xl font-bold">${job.title}</h1>
            <p>React Native Developer</p>
            <p>Remote • Full-time • $130,000 - $175,000</p>
            <p class="status text-green-500 font-bold">${job.status}</p>
            <p>Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
            <div class="space-x-2">
                <button class="interview-btn bg-white text-green-500 px-4 py-2 border rounded">INTERVIEW</button>
                <button class="rejected-btn bg-white text-red-500 px-4 py-2 border rounded">REJECTED</button>
            </div>
        </div>
        <div>
            <img src="./jobs.png" alt="" class="delete-btn">
        </div>`;
        filteredCards.appendChild(div);
    }
}

// ৫. রিজেক্টেড সেকশন রেন্ডার করার ফাংশন
function renderRejected() {
    filteredCards.innerHTML = '';
    for (let job of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-200 rounded-[10px] p-5 bg-white';
        div.innerHTML = `
        <div class="space-y-2">
            <h1 class="text-xl font-bold">${job.title}</h1>
            <p>React Native Developer</p>
            <p>Remote • Full-time • $130,000 - $175,000</p>
            <p class="status text-red-500 font-bold">${job.status}</p>
            <p>Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
            <div class="space-x-2">
                <button class="interview-btn bg-white text-green-500 px-4 py-2 border rounded">INTERVIEW</button>
                <button class="rejected-btn bg-white text-red-500 px-4 py-2 border rounded">REJECTED</button>
            </div>
        </div>
        <div>
            <img src="./jobs.png" alt="" class="delete-btn">
        </div>`;
        filteredCards.appendChild(div);
    }
}