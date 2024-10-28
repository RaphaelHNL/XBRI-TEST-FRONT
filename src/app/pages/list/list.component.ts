import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  dataSet: any[] = [];
  isVisible = false;
  isOkLoading = false;
  indexToDelete: number;
  itemToDelete: any;
  constructor(private router: Router,
    private notification: NzNotificationService
  ) {}
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const savedItems = JSON.parse(localStorage.getItem('items') || '[]');
    this.dataSet = savedItems;
  }

  deleteItem() {
    const localStorageItem = JSON.parse(localStorage.getItem('items') || '[]');
    localStorageItem.splice(this.indexToDelete, 1); 
    localStorage.setItem('items', JSON.stringify(localStorageItem));
    this.loadData();
    this.notification.blank('Exclusão','O item foi excluido com sucesso!');
    this.isVisible = false;
  }

  editItem(item: any, index: number) {
    this.router.navigate(['/form'], { state: { item: item, index: index } });
  }

  goToForm(){
    this.router.navigate(['/form']);
  }

  showModal(item: any, index: number): void {
    this.itemToDelete = item;
    this.indexToDelete = index;
    this.isVisible = true;
  }

  cancelModal(){
    this.isVisible = false;
  }
}