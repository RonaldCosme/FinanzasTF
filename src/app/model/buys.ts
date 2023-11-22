export class buys{
  id:number = 0;                           // ID REGISTRO
  userId: number = 0;                     // ID USUARIO
  model:string = "";                     // Nombre del Vehiculo
  price: number = 0;                    // Precio del vehiculo
  currency:string = "";                // Modena
  couta_inicial_porcentaje:number = 0 // % Couta Inicial
  initial_fee: number = 0;      // Couta Inicial
  credit:  number = 0;         // Credito
  plazo:number = 0;           //
  type_interest_rate:string = ""; // Tipo de tasa
  interest_rate:number = 0       // Tasa
  type_grace_period:string = "";// Tipo de periodo de gracia
  grace_period:number = 0 // Duracion del periodo de gracia
  VAN: number = 0; // Valor Actual Neto
  TIR: number = 0; // TIR
  Desgravamen: string = ""; // Desgravamen segun banco
}

