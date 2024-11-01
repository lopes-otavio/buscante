import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { Livro } from '../../models/interfaces';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() livro!: Livro;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  @HostListener('document:keydown.escape') fecharModalAoPressionarEsc() {
    if (this.statusModal) this.fecharModal();
  }

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
    this.renderer.setStyle(
      this.element.nativeElement.ownerDocument.body,
      'overflow',
      'auto'
    );
  }

  lerPrevia() {
    window.open(this.livro.previewLink, '_blank');
  }

  get thumbnailUrl() {
    return this.livro.thumbnail || 'assets/imagens/capa-indisponivel.png';
  }
}
