
let totalNumberOfBooks = 4;

function Book(title, author, pages, genre, description, image) {
     this.title = title;
     this.author = author;
     this.pages = pages;
     this.genre = genre;
     this.description = description;
     this.image = image;
      totalNumberOfBooks = totalNumberOfBooks + 1;
     this.createBook = function () {
          let book = '<img src="'+ this.image + '"><ul><li>Title: ' + this.title + '</li><li>Author: ' + this.author + '</li><li># Pages: ' + this.pages + '</li><li>Genre: ' + this.genre + '</li><li>Description: ' + this.description + '</li></ul>'; 
          return book;
          };
     this.createBookNoImage = function () {
          let book = '<ul><li>Title: ' + this.title + '</li><li>Author: ' + this.author + '</li><li># Pages: ' + this.pages + '</li><li>Genre: ' + this.genre + '</li><li>Description: ' + this.description + '</li></ul>'; 
          return book;
          } 
}

// function that creates a text book object

function textBook(title, author, pages, genre, description, image, subject) {
     Book.call(this, title, author, pages, genre, description, image);
     this.subject = subject;
}
textBook.prototype = Object.create(Book.prototype);

Object.defineProperty(textBook.prototype, 'constructor', { 
     value: textBook, 
     enumerable: false, // so that it does not appear in 'for in' loop
     writable: true });

// Function that adds new books

addNewBook = function(book) {
    let books = document.getElementById('books');
    let booksinner = books.innerHTML;
    let newBook = book.createBook(book.title, book.author, book.pages, book.genre, book.description, book.image);
    books.innerHTML = booksinner + '<article id="' + totalNumberOfBooks + '">' + newBook + '</article>';
    totalNumberOfBooks = totalNumberOfBooks + 1;
}




// Instances of book objects
     // Normal Books
let richDad = new Book('Rich Dad Poor Dad', 'Robert T. Kiyosaki', 183, 'Business', 'Teaches you the basics of personal finance', 'images/richDad.jpg' );
let mobyDick = new Book('Moby Dick', 'Herman Melvile', 621, 'Adventure', 'Man tries to catch whale', 'images/moby.jpg');
let warren = new Book('The Interpretation of Financial Statements', 'Warren Buffet', 188, 'Business', 'Teaches you what Warren looked for in financial statements', 'images/warren.jpg');
let animal = new Book('Animal Farm', 'George Orwell', 412, 'Educational Fiction', 'About animals that team up and takeover their owner', 'images/animal.jpg');
let habit = new richDad.constructor('The Power Of Habit', 'Charles Duhigg', 371, 'Pycology', 'Shows you what good habits can do for you', 'images/habit.jpg');

// Text Books
let mathBook = new textBook('algebra 1', 'Michael fucker', 675, 'math', 'teaches you algebra', 'images/math.jpg', 'Math');

// Rich Dad Poor Dad
let bookRich = document.getElementById('book1');
bookRich.innerHTML = '<img src="'+ richDad.image + '"><ul><li>Title: ' + richDad.title + '</li><li>Author: ' + richDad.author + '</li><li># Pages: ' + richDad.pages + '</li><li>Genre: ' + richDad.genre + '</li><li>Description: ' + richDad.description + '</li></ul>'; 

// Moby Dick
let bookMoby = document.getElementById('book2');
bookMoby.innerHTML = '<img src="'+ mobyDick.image +'"><ul><li>Title: ' + mobyDick.title + '</li><li>Author: ' + mobyDick.author + '</li><li># Pages: ' + mobyDick.pages + '</li><li>Genre: ' + mobyDick.genre + '</li><li>Description: ' + mobyDick.description + '</li></ul>';

// Interpretation of Financial Statements
let interpretation = document.getElementById('book3');
interpretation.innerHTML = '<img src="'+ warren.image +'"><ul><li>Title: ' + warren.title + '</li><li>Author: ' + warren.author + '</li><li># Pages: ' + warren.pages + '</li><li>Genre: ' + warren.genre + '</li><li>Description: ' + warren.description + '</li></ul>';

// Animal Farm
let animalFarm = document.getElementById('book4');
animalFarm.innerHTML = '<img src="'+ animal.image +'"><ul><li>Title: ' + animal.title + '</li><li>Author: ' + animal.author + '</li><li># Pages: ' + animal.pages + '</li><li>Genre: ' + animal.genre + '</li><li>Description: ' + animal.description + '</li></ul>';

// The Power of Habit
addNewBook(habit);

// Add Book button

let addBook = document.getElementById('favorite');
let xsm = document.getElementById('xsm');
let bookform = document.getElementById('bookform');
let newBook = document.getElementById('newbook');
addBook.addEventListener('click',function() {  
    bookform.style.display = 'block';
},false);
xsm.addEventListener('click', function() {
     bookform.style.display = 'none';   
}, false);

// Adds book to section

 
 
 let bookSubmit = document.getElementById('booksubmit');
 let actualForm = document.getElementById('actualform');

 actualForm.addEventListener('submit', function (e) {
     bookform.style.display = 'none';
     let allBooks = document.getElementById('books').innerHTML;
     let allTheBooks = document.getElementById('books');
      
      let title = document.getElementById('title').value;
      let author = document.getElementById('author').value;
      let pages = document.getElementById('pages').value;
      let genre = document.getElementById('genre').value;
      let description = document.getElementById('description').value;
      let image = document.getElementById('image').value; 

      let bookname = '' + title + '';
     bookname = new Book(title, author, pages, genre, description, image);
      
     let bookDetails = bookname.createBook();
     
      let newbook =  '<article class="book' +totalNumberOfBooks +'" id="book' + totalNumberOfBooks +'">' + bookDetails + '</article>';
      allTheBooks.innerHTML = allBooks + newbook; 
      totalNumberOfBooks = totalNumberOfBooks + 1;    
      e.preventDefault();
 }, false); 

 
 // adding a new method using contructor 
// It works
Book.prototype.hello = function() {
     alert('I am gay' + this.pages);
}
richDad.hello(); 





// Extra not relating to the program
function listAllProperties(o) {
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = o; objectToInspect !== null; 
           objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
        result = result.concat(
            Object.getOwnPropertyNames(objectToInspect)
        );  
    }
	console.log(result);
	return result; 
}
listAllProperties(richDad);



