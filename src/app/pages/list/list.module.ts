import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [ListRoutingModule,
    NzTableModule,
    NzDividerModule,
    CommonModule,
    NzNotificationModule,
    NzModalModule,
    NzButtonModule
  ],
  declarations: [ListComponent],
  exports: [ListComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ListModule { }
