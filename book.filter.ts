import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.interface';

@Pipe({
  name: 'bookFilter',
  standalone: true
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], searchText: string): Book[] {
    if (!searchText) return books;

    searchText = searchText.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.genre.toLowerCase().includes(searchText)
    );
  }
}