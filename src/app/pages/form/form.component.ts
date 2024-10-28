import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  editItem: any;
  editIndexItem: any;
  form: FormGroup;
  title: string;

  autoTips: Record<string, Record<string, string>> = {
    default: {
      email: 'Input is required'
    }
  };

  constructor(private fb: FormBuilder, private router: Router, private notification: NzNotificationService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as any;
      this.editItem = state['item'];
      this.editIndexItem = state['index']; 
    }

    this.title = this.editItem ? 'Editar' : 'Adicionar um novo item';

    this.form = this.fb.group({
      nameItem: [this.editItem ? this.editItem.nameItem : '', [Validators.required, Validators.maxLength(70)]],
      categoria: [this.editItem ? this.editItem.categoria : '', [Validators.required]],
      quantidade: [this.editItem ? this.editItem.quantidade : ''],
      preco: [this.editItem ? this.editItem.preco : ''],
      ativo: [this.editItem ? this.editItem.ativo : false, Validators.required],
    });

    // Atualiza os campos de quantidade e preço conforme o status do checkbox
    this.form.get('ativo')?.valueChanges.subscribe((ativo: any) => {
      if (ativo) {
        this.form.get('quantidade')?.setValidators([Validators.required]);
        this.form.get('preco')?.setValidators([Validators.required]);
      } else {
        this.form.get('quantidade')?.clearValidators();
        this.form.get('preco')?.clearValidators();
      }
      this.form.get('quantidade')?.updateValueAndValidity();
      this.form.get('preco')?.updateValueAndValidity();
    });
  }


  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value;

      const savedItems = JSON.parse(localStorage.getItem('items') || '[]');

      if (this.editItem) {
        // Edita o item
        savedItems[this.editIndexItem] = formData;
        this.notification.blank('Edição','O item foi editado com sucesso!');
      } else {
        // Adiciona novo item
        savedItems.push(formData);
        this.notification.blank('Sucesso','O item foi adicionado com sucesso!');
      }
      
      localStorage.setItem('items', JSON.stringify(savedItems));

    } else {
      Object.values(this.form.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.notification.blank('Error','Necessário preencher todos os campos!');
    }
  }

  onCancel() {
    this.router.navigate(['/list']);
  }

}
