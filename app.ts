import { Book, Logger as DamageLogger, Author, Librarian } from './interfaces';
import { Category } from './enums';
import { UniversityLibrarian, ReferenceItem } from './classes';

import { CalculateLateFee as CalcFee, MaxBooksAllowed, Purge } from './lib/utilityFunctions';
import refBook1 from './encyclopedia';

let reference = new refBook1('Fact Book', 2016, 1);

function GetAllBooks(): Book[] {
    let books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction },
        { id: 2, title: 'A Farewell To Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
        { id: 3, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
    ]

    return books;
}

// using logic as default parameter
function LogFirstAvailable(books = GetAllBooks()): void {
    let numberOfBooks: number = books.length; 
    let firstAvailable: string = '';

    for(let currentBook of books) {
        if(currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }

    console.log('Total Books: ' + numberOfBooks);
    console.log('First Available: ' + firstAvailable);
}


// using default parameter
function GetBookTitlesByCategory(categoryFilter: Category = Category.Fiction): string[] {
    console.log('Getting books in category: ' + Category[categoryFilter]);

    const allBooks = GetAllBooks();
    const filteredTitles: string[] = [];

    for(let currentBook of allBooks) {
        if(currentBook.category === categoryFilter) {
            filteredTitles.push(currentBook.title);
        }
    }

    return filteredTitles
}

function LogBookTitles(titles: string[]): void {
    for(let title of titles) {
        console.log(title);
    }
}

function GetBookById(id: number): Book {
    const allBooks = GetAllBooks();

    return allBooks.filter((book) => book.id === id)[0];
}

function CreateCustomerId(name: string, id: number): string {
    return name + id;
}
// using function types
// let myId: string = CreateCustomerId('Michael', 10);
// console.log(myId);

function CreateCustomer(name: string, age?: number, city?: string): void {
    console.log('Creating customer ' + name);

    if(age) {
        console.log('Age: ' + age);
    }

    if(city) {
        console.log('City: ' + city);
    }
}

function CheckoutBooks(customer: string, ...bookIds: number[]): string[] {
    console.log('Checking out books for ' + customer);

    let booksCheckedOut: string[] = [];

    for(let id of bookIds) {
        let book = GetBookById(id);
        if(book.available) {
            booksCheckedOut.push(book.title);
        }
    }

    return booksCheckedOut;
}

let myBooks: string[] = CheckoutBooks('Thorne', 1, 3);
myBooks.forEach(title => console.log(title));

// using arrow functions
// const fictionBooks = GetBookTitlesByCategory(Category.Fiction);
// fictionBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val));

function GetTitles(author: string): string[];
function GetTitles(available: boolean): string[];
function GetTitles(bookProperty: any): string[] {
    const allBooks = GetAllBooks();
    const foundTitles: string[] = [];

    if(typeof(bookProperty) == 'string') {
        for(let book of allBooks) {
            if(book.author === bookProperty) {
                foundTitles.push(book.title);
            }
        }
    }
    if(typeof(bookProperty) == 'boolean') {
        for(let book of allBooks) {
            if(book.available === bookProperty) {
                foundTitles.push(book.title);
            }
        }
    }

    return foundTitles;
}

let hermansBooks = GetTitles('Herman Melville');
hermansBooks.forEach(title => console.log(title));

function PrintBook(book:Book): void {
    console.log(book.title + ' by ' + book.author);
}

let myBook: Book = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: Category.Fiction,
    pages: 250,
    markDamaged: (reason: string) => console.log('Damaged: ' + reason)
};

class ElementarySchoolLibrarian implements Librarian {
    department: string;
    assistCustomer: (custName: string) => void;
    name: string;
    email: string;

    doWork() {
        console.log('Reading to and teaching children...');
    }
}

let kidsLibrarian = new ElementarySchoolLibrarian();
kidsLibrarian.doWork();

let favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Sharon';
favoriteLibrarian.assistCustomer('Lynda');

let ref = new ReferenceItem('Facts and Figures', 2012);
ref.printItem();

ref.publisher = 'MC Hammer';
console.log(ref.publisher);

let refBook = new refBook1('WorldPedia', 1900, 10);
refBook.printItem();

 let Newspaper = class extends ReferenceItem {
     printCitation(): void {
         console.log(`Newspaper: ${this.title}`);
     }
 }

let myPaper = new Newspaper('The Gazette', 1960);
myPaper.printCitation();

class Novel extends class { title: string } {
    mainCharacter: string;
}
let favoriteNovel = new Novel();
favoriteNovel.mainCharacter;

let inventory: Array<Book> = [
    { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction },
    { id: 2, title: 'A Farewell To Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
    { id: 3, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
];

let purgedBooks: Array<Book> = Purge<Book>(inventory); // let purgedBooks = Purge(inventory);
purgedBooks.forEach(book => console.log(book.title));

let purgedNums: Array<number> = Purge<number>([1, 2, 3, 4]);
purgedNums.forEach(num => console.log(num));