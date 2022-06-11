import { Injectable } from '@angular/core';
declare var Swal: any;
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class NotifiService {

  constructor() { }
  showMessage(icon, title, text) {
    $(function() {
      Swal.fire({
        showConfirmButton: false,
        timer: 2000,
        icon: icon,
        title: title,
        text: text
      });
    });
  }
}

