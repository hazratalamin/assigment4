let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn'; // Default status

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

// ২. ফিল্টার বাটন টগল করার ফাংশন
function toggleStyle(id) {
    currentStatus = id;
    
    // সব বাটনের স্টাইল রিসেট
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-gray-300');
    });

    // সিলেক্টেড বাটনের স্টাইল সেট
    const selected = document.getElementById(id);
    selected.classList.add('bg-[#3B82F6]', 'text-white');
    selected.classList.remove('bg-gray-300');

    // সেকশন শো/হাইড লজিক
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

// ৩. মেইন ক্লিক ইভেন্ট হ্যান্ডলার
mainContainer.addEventListener('click', function (event) {
    const target = event.target;
    const parentNode = target.closest('.card'); 
    if (!parentNode) return;

    const title = parentNode.querySelector('h1').innerText;
    const statusDisplay = parentNode.querySelector('.status'); 

    const cardInfo = {
        title,
        status: ''
    };

    if (target.classList.contains('interview-btn')) {
        cardInfo.status = 'INTERVIEW';
        
        // All Section-এ সরাসরি স্ট্যাটাস এবং কালার আপডেট
        if (statusDisplay) {
            statusDisplay.innerText = 'INTERVIEW';
            statusDisplay.className = 'status text-green-500 font-bold';
        }

        // ইন্টারভিউ লিস্টে যোগ করা
        if (!interviewList.find(item => item.title === title)) {
            interviewList.push(cardInfo);
        }
        // রিজেক্টেড লিস্ট থেকে রিমুভ করা (যদি আগে থেকে থাকে)
        rejectedList = rejectedList.filter(item => item.title !== title);
    } 
    
    else if (target.classList.contains('rejected-btn')) {
        cardInfo.status = 'REJECTED';

        // All Section-এ সরাসরি স্ট্যাটাস এবং কালার আপডেট
        if (statusDisplay) {
            statusDisplay.innerText = 'REJECTED';
            statusDisplay.className = 'status text-red-500 font-bold';
        }

        // রিজেক্টেড লিস্টে যোগ করা
        if (!rejectedList.find(item => item.title === title)) {
            rejectedList.push(cardInfo);
        }
        // ইন্টারভিউ লিস্ট থেকে রিমুভ করা (যদি আগে থেকে থাকে)
        interviewList = interviewList.filter(item => item.title !== title);
    }

    calculateCounts();
    
    // ফিল্টার ভিউতে থাকলে সাথে সাথে আপডেট দেখানো
    if (currentStatus === 'interview-filter-btn') renderInterview();
    if (currentStatus === 'rejected-filter-btn') renderRejected();
});

// ৪. ফিল্টার করা কার্ডগুলো দেখানোর ফাংশনসমূহ
function renderInterview() {
    filteredCards.innerHTML = '<h2 class="text-xl font-bold mb-4 text-green-600">Interview Jobs</h2>';
    interviewList.forEach(item => {
        filteredCards.appendChild(createCardHTML(item, 'text-green-500'));
    });
}

function renderRejected() {
    filteredCards.innerHTML = '<h2 class="text-xl font-bold mb-4 text-red-600">Rejected Jobs</h2>';
    rejectedList.forEach(item => {
        filteredCards.appendChild(createCardHTML(item, 'text-red-500'));
    });
}

// কার্ডের HTML তৈরি করার কমন ফাংশন
function createCardHTML(data, statusColor) {
    let div = document.createElement('div');
    div.className = 'card flex justify-between border border-gray-200 rounded-[10px] p-5 bg-white';
    div.innerHTML = `
        <div class="space-y-2">
            <h1 class="text-lg font-bold">${data.title}</h1>
            <p>React Native Developer</p>
            <p>Remote • Full-time • $130,000 - $175,000</p>
            <p class="status ${statusColor} font-bold">${data.status}</p>
            <p class="text-gray-600 text-sm">Build cross-platform mobile applications using React Native.</p>
            <div class="space-x-2">
                <button class="interview-btn bg-white text-green-500 px-4 py-1 border border-green-500 rounded text-sm">INTERVIEW</button>
                <button class="rejected-btn bg-white text-red-500 px-4 py-1 border border-red-500 rounded text-sm">REJECTED</button>
            </div>
        </div>
        <div>
           <img src="./jobs.png" alt="delete" class="delete-btn w-6 h-6 cursor-pointer">
        </div>`;
    return div;
}