import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FliesResponse } from '../../../models/fly.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
})
export class ProductCard {
  @Input({ required: true }) fly!: FliesResponse;

  @Output() addToCart = new EventEmitter<FliesResponse>();

  private readonly whatsappNumber = '254782629457';

  whatsappUrl = '';

  ngOnInit(): void {
    const message = encodeURIComponent(
      `Hi! I'd like to order the *${this.fly.name}* (${this.fly.category}, Hook #${this.fly.hookSize}) — KES ${this.fly.price}. Is it available?`,
    );
    this.whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${message}`;
  }

  onAddToCart(): void {
    this.addToCart.emit(this.fly);
  }
}
