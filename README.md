1.getElementById: 1.Finds a single element by its ID
                 2.  A single element
                 3.document.getElementById('myDiv')


 getElementsByClassName:  1.Finds elements by their class              

                           2. HTMLCollection (multiple elements, works like an array)
                           3.document.getElementsByClassName('box')


   querySelectorAll :    1.Finds all elements matching a CSS selector

                      2. Returns a NodeList (multiple elements)

                      3.  Example: document.querySelectorAll('.box')   

        

         querySelector: 1.Finds an element using any CSS selector

                    2.  Returns the first matching single element

                      3.    Example: document.querySelector('.box')              


2.  How do you create and insert a new element into the DOM?
  
 let newDiv = document.createElement('div');
    
newDiv.textContent = " new Div";

document.body.appendChild(newDiv); 


3. What is Event Bubbling and How It Works


Event Bubbling is the process where an event moves upward through the DOM.


document.getElementById('parent').addEventListener('click', () => {
  alert('Parent clicked');
});

document.getElementById('btn').addEventListener('click', () => {
  alert('Button clicked');
});

4. What is Event Delegation in JavaScript? Why is it useful?
   
Event Delegation is when we put an event listener on a parent element and handle events for its child elements.


advan:
1.we don’t need separate listeners for many child elements → saves memory.

2.It also works for new elements that are added later to the DOM.


document.getElementById('parent').addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    alert('Button clicked inside parent');
  }
});
5.What is the difference between preventDefault() and stopPropagation() methods?
1. preventDefault()

Stops the browser’s default behavior

Example: Clicking <a href="#">Link</a> will not reload the page

2. stopPropagation()

Stops the event from going to the parent (stops bubbling)

Example: Clicking a button will not trigger the parent’s click listener











                      
