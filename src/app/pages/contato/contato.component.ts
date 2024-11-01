import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
})
export class ContatoComponent {
  contatoForm!: FormGroup;

  constructor(
    private liveAnnoucer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.contatoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      motivoContato: [''],
      melhorFormaContato: ['email'],
      mensagem: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      this.liveAnnoucer.announce('Fourmulário enviado com sucesso!');
      this.contatoForm.reset();
    }
  }

  cancelar() {
    this.contatoForm.reset();
    this.router.navigateByUrl('/');
  }
}
