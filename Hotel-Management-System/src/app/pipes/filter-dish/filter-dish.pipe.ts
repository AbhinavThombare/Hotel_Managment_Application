import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDish',
  pure: true
})
export class FilterDishPipe implements PipeTransform {

  transform(items: any[], serachTerm: string): any[] {
    if(!items) return []
    if(!serachTerm) return items;

    serachTerm = serachTerm.toLowerCase()
    return items.filter((it) => {
      return it.Dish_Name.toLowerCase().includes(serachTerm)
    })

  }

}
