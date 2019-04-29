import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../models/Client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      
    });
  }

  onSaveClient() {
    const name = this.clientForm.get('name').value;
    const phone = this.clientForm.get('phone').value;
    const address = this.clientForm.get('address').value;

    const newClient = new Client(name, phone, address);

    this.clientService.createNewClient(newClient);

    this.router.navigate(['/clients'])
  }


  onBack() {
    this.router.navigate(['/clients']);
  }


}
