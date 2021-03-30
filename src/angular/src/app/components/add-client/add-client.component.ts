import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = new Client();
  submitted = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  saveClient(): void {
    let data = {
      firstName: this.client.firstName,
      lastName: this.client.lastName,
      email: this.client.email
    };

    this.clientService.create(data)
      .subscribe(response => {
        console.log(response);
        this.submitted = true;
      },
        error => {
          console.log(error);
        });
  }

  newClient() : void {
    this.submitted = false;
    this.client = new Client();
  }
}
