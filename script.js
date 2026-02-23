let interviewList = [];
let rejectedList =[];
let currentStatus =[];


let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let  rejectCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('allCards');

const mainContainer = document.querySelector('main');

const filteredCards = document.getElementById('filteredCards');



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

// console.log(id);
     const selected = document.getElementById(id);
    //  console.log(selected);

  selected.classList.remove('bg-gray-300', 'text-white');
  selected.classList.add('bg-[#3B82F6]', 'text-white')

  if(id == 'interview-filter-btn'){
    allCards.classList.add('hidden');
    filteredCards.classList.remove('hidden');
  }
  else if(id == 'all-filter-btn'){
    allCards.classList.remove('hidden');
    filteredCards.classList.add('hidden');
  }
  else if(id == 'rejected-filter-btn'){
  allCards.classList.add('hidden');
  filteredCards.classList.remove('hidden');
  }

}

mainContainer.addEventListener('click', function(event){

    console.log(event.target.classList.contains('interview-btn'));

        if(event.target.classList.contains('interview-btn')){

     const parentNode = event.target.parentNode.parentNode;
    const title = parentNode.querySelector('h1').innerText;
    const role = parentNode.querySelectorAll('p')[0].innerText;
    const details = parentNode.querySelectorAll('p')[2].innerText;
    const status = parentNode.querySelector('.status').innerText;
    parentNode.querySelector('.status').innerText = 'INTERVIEW';

    const cardInfo = {
        title,
        role,
        details,
        status:'INTERVIEW'
    }
    const titleExist = interviewList.find(item => item.title === cardInfo.title);

    

if(!titleExist){
    interviewList.push(cardInfo);
} 
rejectedList = rejectedList.filter(item=>item.title != cardInfo.title)
calculateCounts()
 renderInterview()
}
       else if(event.target.classList.contains('rejected-btn')){

     const parentNode = event.target.parentNode.parentNode;
    const title = parentNode.querySelector('h1').innerText;
    const role = parentNode.querySelectorAll('p')[0].innerText;
    const details = parentNode.querySelectorAll('p')[2].innerText;
    const status = parentNode.querySelector('.status').innerText;
    parentNode.querySelector('.status').innerText = 'REJECTED';

    const cardInfo = {
        title,
        role,
        details,
        status:'Rejected'
    }
    const titleExist = rejectedList.find(item => item.title === cardInfo.title);

    

if(!titleExist){
    rejectedList.push(cardInfo);
} 
interviewList = interviewList.filter(item=>item.title != cardInfo.title)
if 
calculateCounts()

 renderInterview()
}
    
});

function renderInterview (){

filteredCards.innerHTML = '';

for( let interview of interviewList){

console.log(interview);

let div = document.createElement('div');

div.className ='card flex justify-between border border-gray-200 rounded-[10px] p-5';

div.innerHTML =`   
<div class="space-y-2">
<h1>${interview.title} </h1>
<p>React Native Developer</p>
<p>Remote • Full-time • $130,000 - $175,000</p>

 <p class="status text-green-500">${interview.status}</p>
<p>Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
<!-- btn1 -->
<div class="space-x-2">
    <button class=" interview-btn bg-white-500 text-green-500 px-4 py-2 border rounded">INTERVIEW</button>
    <button class=" rejected-btn bg-white-500 text-red-500 px-4 py-2 border rounded">REJECTED</button>
</div>
        </div>
        <!-- main2 -->
        <div>
           <img src="./jobs.png" alt="" class="delete-btn">
        </div>
`
filteredCards.appendChild(div);
}

}


function renderRejected (){

filteredCards.innerHTML = '';

for( let rejected of rejectedList){

// console.log(interview);

let div = document.createElement('div');

div.className ='card flex justify-between border border-gray-200 rounded-[10px] p-5';

div.innerHTML =`   
<div class="space-y-2">
<h1>${interview.title} </h1>
<p>React Native Developer</p>
<p>Remote • Full-time • $130,000 - $175,000</p>

 <p class="status text-green-500">${interview.status}</p>
<p>Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
<!-- btn1 -->
<div class="space-x-2">
    <button class=" interview-btn bg-white-500 text-green-500 px-4 py-2 border rounded">INTERVIEW</button>
    <button class=" rejected-btn bg-white-500 text-red-500 px-4 py-2 border rounded">REJECTED</button>
</div>
        </div>
        <!-- main2 -->
        <div>
           <img src="./jobs.png" alt="" class="delete-btn">
        </div>
`
filteredCards.appendChild(div);
}

}