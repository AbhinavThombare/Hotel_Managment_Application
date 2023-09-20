import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterValue',
  pure: true
})
export class FilterValuePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return it.Dish_Name.toLowerCase().includes(searchText);
    });
  }

}
