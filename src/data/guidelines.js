export const guidelines = {
  anticoagulantes: {
    HNF: { 
      parar: '4-6 horas antes', 
      razon: 'Reducir riesgo de sangrado', 
      condiciones: (factores) => factores.riesgoAlto ? ' y considerar reversión con protamina' : '' 
    },
    HBPM: {
      profilactica: { 
        parar: '12 horas antes', 
        razon: 'Reducir riesgo de sangrado', 
        condiciones: () => '' 
      },
      terapeutica: { 
        parar: '24 horas antes', 
        razon: 'Reducir riesgo de sangrado', 
        condiciones: () => '' 
      },
    },
    NOACs: {
      riesgoBajo: { 
        parar: '24 horas antes', 
        razon: 'Reducir riesgo de sangrado' 
      },
      riesgoAlto: { 
        parar: '48 horas antes', 
        razon: 'Reducir riesgo de sangrado', 
        condiciones: (factores) => factores.crCl < 30 ? ' y ajustar según CrCl (extender a 72h si CrCl <15)' : '' 
      },
    },
    AVK: { 
      parar: 'Hasta INR <1.5', 
      razon: 'Reducir riesgo de sangrado', 
      condiciones: (factores) => factores.riesgoAlto ? ' y considerar vitamina K/PCC' : (factores.inrActual > 1.5 ? ' y monitorear INR' : '') 
    },
  },
  antiplaquetarios: {
    aspirina: {
      riesgoBajo: { 
        parar: 'Continuar', 
        razon: 'Bajo riesgo de sangrado' 
      },
      riesgoAlto: { 
        parar: 'Suspender', 
        razon: 'Alto riesgo de sangrado', 
        condiciones: (factores) => ' y balancear riesgo trombótico vs. sangrado' 
      },
    },
    DAPT: {
      riesgoBajo: { 
        parar: 'Suspender P2Y12 5-7 días, continuar aspirina', 
        razon: 'Reducir riesgo de sangrado' 
      },
      riesgoAlto: { 
        parar: 'Suspender P2Y12 5-7 días, continuar aspirina', 
        razon: 'Reducir riesgo de sangrado', 
        condiciones: (factores) => factores.hasStent && factores.tiempoStent < 6 ? ' y retrasar cirugía o puentear si stent <6 meses' : '' 
      },
    },
  },
  glp1: {
    diario: { 
      parar: 'Día antes y día de la cirugía', 
      razon: 'Reducir riesgo de aspiración', 
      condiciones: (factores) => factores.noSuspendido ? ' y usar ecografía gástrica/RSI si no suspendido' : (factores.sintomasEstomagoLleno ? ' y evaluar síntomas de estómago lleno' : '') 
    },
    semanal: { 
      parar: '1 semana antes (día -8)', 
      razon: 'Reducir riesgo de aspiración', 
      condiciones: (factores) => factores.noSuspendido ? ' y usar ecografía gástrica/RSI si no suspendido' : (factores.sintomasEstomagoLleno ? ' y evaluar síntomas de estómago lleno' : '') 
    },
  },
  sglt2i: { 
    parar: '3-4 días antes', 
    razon: 'Prevenir cetoacidosis diabética euglucémica', 
    condiciones: (factores) => factores.noSuspendido ? ' y verificar BOHB, hidratar si no suspendido' : (factores.bohb > 2 ? ' y monitorear BOHB >2 mmol/L' : '') 
  },
};