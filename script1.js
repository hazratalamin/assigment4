let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filteredCards = document.getElementById('filteredCards');

function calculateCounts() {
    total.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectedList.length;
}
calculateCounts();

function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    allFilterBtn.classList.add('bg-gray-300', 'text-white');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-white');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-white');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300', 'text-white');
    selected.classList.add('bg-[#3B82F6]', 'text-white');
}

mainContainer.addEventListener('click', function (event) {
    // চেক করা হচ্ছে ক্লিক কি ইন্টারভিউ বাটনে পড়েছে?
    if (event.target.classList.contains('interview-btn')) {
        
        // আপনার HTML অনুযায়ী বাটনের প্যারেন্টের প্যারেন্ট হলো মূল কার্ড
        const parentNode = event.target.parentNode.parentNode;
        
        const title = parentNode.querySelector('h1').innerText;
        const role = parentNode.querySelectorAll('p')[0].innerText;
        const details = parentNode.querySelectorAll('p')[2].innerText; // আপনার HTML এ ৩য় <p> তে ডিটেইলস আছে
        const status = parentNode.querySelector('.status').innerText;

        const cardInfo = {
            title,
            role,
            details,
            status
        }
        
        const titleExist = interviewList.find(item => item.title === cardInfo.title);
        if (!titleExist) {
            interviewList.push(cardInfo);
            console.log("Interview added:", cardInfo); // এখন কনসোল আউটপুট আসবে
        }
        
        calculateCounts(); // সংখ্যা আপডেট করার জন্য
        renderInterview();
    }
});

function renderInterview() {
    filteredCards.innerHTML = '';
    
    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-200 rounded-[10px] p-5 mb-4';
        
        // এখানে আপনার দেওয়া টেম্পলেট ব্যবহার করা হয়েছে
        div.innerHTML = `
        <div class="space-y-2">
            <h1>${interview.title}</h1>
            <p>${interview.role}</p>
            <p class="status text-green-500">Interviewing</p>
            <p>${interview.details}</p>
        </div>
        <div>
           <img src="./jobs.png" alt="" class="w-12">
        </div>`;
        
        // এটিই ছিল আপনার প্রধান ভুল: চাইল্ড যোগ করা হয়নি
        filteredCards.appendChild(div);
    }
}