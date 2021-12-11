import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { InvoicePreviewService } from 'app/main/apps/invoice/invoice-preview/invoice-preview.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.service.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvoicePreviewComponent implements OnInit, OnDestroy {
  // public
  public apiData;
  public urlLastValue;
  public url = this.router.url;
  public sidebarToggleRef = false;
  public paymentSidebarToggle = false;
  public paymentDetails = {
    totalDue: '$12,110.55',
    bankName: 'American Bank',
    country: 'United States',
    iban: 'ETD95476213874685',
    swiftCode: 'BR91905'
  };




  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {InvoicePreviewService} _invoicePreviewService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private router: Router,
    private _invoicePreviewService: InvoicePreviewService,
    private _coreSidebarService: CoreSidebarService
  ) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  razroptions = {
    "key": "rzp_test_EQ9GN8yjUkiCMP",
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "order_IW3KpZVE1IbS1s",
    "handler": function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },
    "prefill": {
      "name": "Gaurav Kumar",
      "email": "gaurav.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  rzp1
  pay() {
    this.rzp1 = new this._invoicePreviewService.nativeWindow.Razorpay(this.razroptions);
    this.rzp1.open();
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._invoicePreviewService.onInvoicPreviewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.apiData = response;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
