import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const PrimeModules = [CommonModule, InputTextModule, ButtonModule];

@NgModule({
  imports: [PrimeModules],
  exports: [PrimeModules],
})
export class PrimengModule {}
