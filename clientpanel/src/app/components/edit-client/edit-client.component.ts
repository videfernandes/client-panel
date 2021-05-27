import { Client } from './../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    //get id from url
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
      console.log(this.client);
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      //show error
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      //add id in value for updating
      value.id = this.id;
      //update client
      this.clientService.updateClient(value);
      //show message
      this.flashMessages.show('Client updated with success!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      //redirect to dashboard
      this.router.navigate(['/client/' + this.id]);
    }
    console.log(value, valid);
  }
}
