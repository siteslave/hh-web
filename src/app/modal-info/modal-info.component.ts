
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styles: []
})
export class ModalInfoComponent implements OnInit {

  @Input('hn')
  set setInfo(value: any) {
    this.hn = value;
  }

  hn: any;
  modalReference: NgbModalRef;

  @ViewChild('content') public content: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      // size: 'lg',
      // centered: true
    });

    this.modalReference.result.then((result) => { });

  }

  dismiss() {
    this.modalReference.close();
  }

  async getInfo(hn: any) {
    try {
      // const rs: any = await this.roomService.list(_servicePointId);
    } catch (error) { }
  }
}
