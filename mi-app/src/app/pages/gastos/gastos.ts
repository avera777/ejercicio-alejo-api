import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GastosService } from '../../services/gastos';
import { SignalrService } from '../../services/signalr';

@Component({
  selector: 'app-gastos',
  imports: [FormsModule, DatePipe],
  templateUrl: './gastos.html',
  styleUrl: './gastos.css'
})
export class Gastos implements OnInit {
  constructor(
    private gastosService: GastosService,
    private signalrService: SignalrService
  ) {}

  mostrarModal = false;
  modoEdicion = false;
  indiceEditando: number | null = null;

  descripcion = '';
  monto = '';
  fecha = '';
  categoria = '';

  listaGastos: any[] = [];

  ngOnInit() {
    this.cargarGastos();

    this.signalrService.startConnection().then(() => {
      this.signalrService.onExpensesUpdated(() => {
        this.cargarGastos();
      });
    });
  }

  cargarGastos() {
    this.gastosService.getGastos().subscribe({
      next: (data) => {
        this.listaGastos = data;
      },
      error: (error) => {
        console.error('Error al obtener gastos:', error);
      }
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.descripcion = '';
    this.monto = '';
    this.fecha = '';
    this.categoria = '';
    this.modoEdicion = false;
    this.indiceEditando = null;
  }

  guardarGasto() {
    const gasto = {
      id: this.modoEdicion && this.indiceEditando !== null
        ? this.listaGastos[this.indiceEditando].id
        : this.generarNuevoId(),
      description: this.descripcion,
      amount: parseFloat(this.monto),
      date: this.fecha,
      category: this.mapearCategoriaApi(this.categoria)
    };

    if (this.modoEdicion && this.indiceEditando !== null) {
      this.gastosService.actualizarGasto(gasto.id, gasto).subscribe({
        next: () => {
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al actualizar gasto:', error);
        }
      });
    } else {
      this.gastosService.agregarGasto(gasto).subscribe({
        next: () => {
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al agregar gasto:', error);
        }
      });
    }
  }

  eliminarGasto(index: number) {
    const confirmar = confirm('¿Seguro que deseas eliminar este gasto?');

    if (!confirmar) return;

    const id = this.listaGastos[index].id;

    this.gastosService.eliminarGasto(id).subscribe({
      next: () => {
        // SignalR se encarga de refrescar la lista
      },
      error: (error) => {
        console.error('Error al eliminar gasto:', error);
      }
    });
  }

  editarGasto(index: number) {
    const gasto = this.listaGastos[index];

    this.descripcion = gasto.description;
    this.monto = gasto.amount.toString();
    this.fecha = this.formatearFechaInput(gasto.date);
    this.categoria = this.mapearCategoriaFrontend(gasto.category);

    this.modoEdicion = true;
    this.indiceEditando = index;
    this.mostrarModal = true;
  }

  formatearFechaInput(fecha: string): string {
    return fecha.split('T')[0];
  }

  generarNuevoId(): number {
    if (this.listaGastos.length === 0) return 1;
    return Math.max(...this.listaGastos.map(g => g.id)) + 1;
  }

  mapearCategoriaApi(categoria: string): number {
    const categorias: { [key: string]: number } = {
      'Alimentación': 0,
      'Transporte': 1,
      'Entretenimiento': 2,
      'Vivienda': 3,
      'Salud': 4,
      'Otros': 5
    };

    return categorias[categoria] ?? 5;
  }

  mapearCategoriaFrontend(categoria: string | number): string {
    const categorias: { [key: string]: string } = {
      '0': 'Alimentación',
      '1': 'Transporte',
      '2': 'Entretenimiento',
      '3': 'Vivienda',
      '4': 'Salud',
      '5': 'Otros',
      'Food': 'Alimentación',
      'Transportation': 'Transporte',
      'Entertainment': 'Entretenimiento',
      'Utilities': 'Vivienda',
      'Healthcare': 'Salud',
      'Other': 'Otros'
    };

    return categorias[String(categoria)] || String(categoria);
  }
}