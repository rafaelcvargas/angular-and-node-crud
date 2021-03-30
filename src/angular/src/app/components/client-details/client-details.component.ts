import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  @ViewChild('updatedModal', { read: TemplateRef }) updatedModal: TemplateRef<any> | undefined;
  currentClient: Client = new Client();
  message = '';

  constructor(
    private clientService: ClientService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getClient(this.route.snapshot.params.id);
  }

  getClient(id: string): void {
    this.clientService.get(id)
      .subscribe(
        data => {
          this.currentClient = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  updateClient(): void {
    this.clientService.update(this.currentClient.id, this.currentClient)
      .subscribe(
        response => {
          this.message = response.message;
          console.log(response);
        },
        error => {
          this.message = error.message;
          console.log(error);
        }).add(() => {
          this.modalService.open(this.updatedModal);
        });
  }

  deleteClient(): void {
    this.clientService.delete(this.currentClient.id)
      .subscribe(
        () => {
          this.modalService.dismissAll(); //esconde todas as modal
          this.router.navigate(['/clients']); //volta pra pagina que estava antes
        },
        error => {
          console.log(error);
        }
      );
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
