import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: `./filters.component.html`,
  styles: [
  ]
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>()
  categoriesSubscriction: Subscription | undefined;
  categories: Array<string> | undefined;
  constructor(private _storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscriction = this._storeService.getAllCategories()
    .subscribe((response) => {
      this.categories = response;
    })
  }

  onShowCategory(category: string):void {
    this.showCategory.emit(category)
  }
  ngOnDestroy(): void {
    if(this.categoriesSubscriction) {
      this.categoriesSubscriction.unsubscribe();
    }
  }
}
