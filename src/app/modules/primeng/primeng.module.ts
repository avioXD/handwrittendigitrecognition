import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
const PrimeModules = [CommonModule, InputTextModule];

@NgModule({
  imports: [PrimeModules],
  exports: [PrimeModules],
})
export class PrimengModule {}
