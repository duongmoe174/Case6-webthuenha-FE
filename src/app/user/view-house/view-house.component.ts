import {Component, OnInit} from '@angular/core';
import {House} from '../../model/house';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotifiService} from '../../service/alert/notifi.service';
import {OrderService} from '../../service/order/order.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {
  images: any = [];
  isShowListImagesForm = false;
  listOrdersDoneByIdHouse: any[] = [];
  houseCurrentId: any;
  houseFE: House = {};
  currentUser: any = {};
  orderExists: any = {};
  ischeckOrder = true;
  ishowEditForm = false;
  orderForm: FormGroup = new FormGroup({
    house: new FormControl(),
    user: new FormControl(),
    checkIn: new FormControl([Validators.required]),
    checkOut: new FormControl([Validators.required]),
  });

  constructor(private houseService: HouseService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notifi: NotifiService,
              private ordersService: OrderService) {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = +paraMap.get('id');
      this.getHouseById(id);
      this.getAllOrdersDoneByIdHouse(id);
    });
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getDateTimePicker();

  }
  showEditForm(id) {
    if (id === this.currentUser.id) {
      this.ishowEditForm = true;
    }
  }
  getAllOrdersDoneByIdHouse(id) {
    this.ordersService.getAllOrderStatusDoneByIdHouse(id).subscribe((list) => {
      this.listOrdersDoneByIdHouse = list;
    });
  }

  isCheckinAndCheckOutValidate(checkin, checkout) {
    for (let i = 0; i < this.listOrdersDoneByIdHouse.length; i++) {
      const timeCheckin: Date = new Date(checkin);
      const timeCheckout: Date = new Date(checkout);
      const testCheckin: Date = new Date(this.listOrdersDoneByIdHouse[i].checkIn);
      const testCheckout: Date = new Date(this.listOrdersDoneByIdHouse[i].checkOut);
      if (timeCheckin.getTime() >= testCheckin.getTime() && timeCheckin.getTime() < testCheckout.getTime()) {
        this.orderExists = this.listOrdersDoneByIdHouse[i];
        return this.ischeckOrder = false;
      }
      if (timeCheckout.getTime() >= testCheckin.getTime() && timeCheckout.getTime() < testCheckout.getTime()) {
        this.orderExists = this.listOrdersDoneByIdHouse[i];
        return this.ischeckOrder = false;
      }
      if (timeCheckin.getTime() <= testCheckin.getTime() && timeCheckout.getTime() >= testCheckout.getTime()) {
        this.orderExists = this.listOrdersDoneByIdHouse[i];
        return this.ischeckOrder = false;
      }
    }
  }

  getDateTimePicker() {
    $(function() {
      var now = new Date(),
        minDate = now.toISOString().substring(0, 10);
      $('#check-in').prop('min', minDate);
      $('#check-out').prop('min', minDate);
    });
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  getHouseById(id) {
    this.houseService.findById(id).subscribe(houseBE => {
      this.houseFE = houseBE;
      this.houseCurrentId = this.houseFE.id;
      this.showEditForm(this.houseFE.user.id);
    });
  }
  changeShowEditForm() {
    this.isShowListImagesForm = !this.isShowListImagesForm;
  }
  submitCreateOrder() {
    if (this.currentUser != null) {
      this.orderForm.value.house = {
        id: this.houseFE.id
      };
      this.orderForm.value.user = {
        id: this.currentUser.id
      };
      this.isCheckinAndCheckOutValidate(this.orderForm.value.checkIn, this.orderForm.value.checkOut);
      const timeCheckin: Date = new Date(this.orderForm.value.checkIn);
      const timeCheckout: Date = new Date(this.orderForm.value.checkOut);
      if (timeCheckout.getTime() > timeCheckin.getTime()) {
        if (this.ischeckOrder) {
          this.ordersService.createOrder(this.orderForm.value).subscribe(() => {
            $(function () {
              $('#create-order').modal('hide');
              $('body').removeClass('modal-open');
              $('.modal-backdrop').remove();
            });
            this.router.navigateByUrl('/orderDetail');
            this.notifi.showMessage('success', 'Book!', 'Đã gửi yêu cầu đặt homstay thành công, vui lòng chờ chủ nhà xác nhận');
          }, error => this.notifi.showMessage('error', 'Book!', 'Đặt lỗi'));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Book!!!',
            text: 'Đặt lỗi do thời gian này đã có khách đặt! Từ: ngày ' + new Date(this.orderExists.checkIn).getUTCDate() + '/' + new Date(this.orderExists.checkIn).getUTCMonth()
              + '/' + new Date(this.orderExists.checkIn).getFullYear() + 'đến ngày ' + new Date(this.orderExists.checkOut).getUTCDate()
              + '/' + new Date(this.orderExists.checkOut).getUTCMonth() + '/' + new Date(this.orderExists.checkOut).getFullYear(),
          });
          this.ischeckOrder = true;
          this.orderExists = {};
        }
      } else {
        this.notifi.showMessage('error', 'Book!', 'Đặt lỗi do thời gian đặt homestay chưa hợp lệ');
      }
    } else {
      $(function() {
        $('#create-order').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      });
      Swal.fire('Vui lòng đăng nhập trước khi đặt nhà!');
      this.router.navigateByUrl('/login');
    }
  }
}
