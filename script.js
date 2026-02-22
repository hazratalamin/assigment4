let interviewList = [];
let rejectedList =[];


let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let  rejectCount = document.getElementById('rejectCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('allCards');

const mainContainer = document.querySelector('main');
console.log(mainContainer);



function calculateCounts(){
    total.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectedList.length;
}
calculateCounts();
 
function toggleStyle(id){
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    allFilterBtn.classList.add('bg-gray-300', 'text-white');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-white');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-white');

console.log(id);
     const selected = document.getElementById(id);
     console.log(selected);

  selected.classList.remove('bg-gray-300', 'text-white');
  selected.classList.add('bg-[#3B82F6]', 'text-white')
}