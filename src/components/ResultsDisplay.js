import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, Pill } from 'lucide-react';

const ResultsDisplay = ({ formData }) => {
  // Generate recommendations based on form data
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (!formData.edad || !formData.peso || !formData.sexo) {
      recommendations.push({
        type: 'warning',
        title: 'Información Incompleta',
        message: 'Complete la información básica del paciente para generar recomendaciones.',
        category: 'Datos del Paciente'
      });
      return recommendations;
    }

    // Process each medication
    Object.entries(formData.medications).forEach(([medication, data]) => {
      if (data.suspension) {
        const recommendation = processMedication(medication, data, formData);
        if (recommendation) {
          recommendations.push(recommendation);
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'info',
        title: 'Sin Medicamentos',
        message: 'No se han registrado medicamentos que requieran manejo preoperatorio.',
        category: 'General'
      });
    }

    return recommendations;
  };

  const processMedication = (medication, data, patientData) => {
    const medNames = {
      heparina_no_fraccionada: 'Heparina No Fraccionada',
      hbpm: 'Heparina de Bajo Peso Molecular (HBPM)',
      noacs: 'NOAC',
      avk: 'AVK',
      aspirina: 'Aspirina',
      dapt: 'DAPT',
      glp1_agonistas: 'Agonistas GLP-1',
      sglt2_inhibidores: 'Inhibidores SGLT2'
    };

    const crCl = parseFloat(patientData.creatinina_clearance) || 90;
    const isHighRisk = patientData.riesgo_sangrado === 'alto';
    
    let recommendation = {
      type: 'success',
      title: medNames[medication],
      category: getCategory(medication),
      message: '',
      details: [],
      timing: ''
    };

    switch (medication) {
      case 'heparina_no_fraccionada':
        if (data.suspension === 'suspender_24h') {
          recommendation.message = 'Suspender 4-6 horas antes del procedimiento';
          recommendation.details = ['Vida media corta: 1-2 horas', 'TTPa normaliza en 4-6 horas'];
        }
        break;
        
      case 'hbpm':
        if (data.suspension === 'suspender_24h') {
          recommendation.message = crCl >= 30 ? 
            'Suspender 24 horas antes (dosis profiláctica) o 24-48h (terapéutica)' :
            'Suspender 48 horas antes (función renal reducida)';
          recommendation.details = [
            `CrCl: ${crCl} ml/min`,
            crCl < 30 ? 'Ajuste por función renal' : 'Función renal normal'
          ];
        }
        break;
        
      case 'noacs':
        if (data.suspension.includes('suspender')) {
          const hours = crCl >= 50 ? '48' : '72';
          recommendation.message = `Suspender ${hours} horas antes del procedimiento`;
          recommendation.details = [
            `CrCl: ${crCl} ml/min`,
            'Considerar anti-Xa si disponible',
            isHighRisk ? 'Procedimiento alto riesgo - considerar bridging' : ''
          ].filter(Boolean);
        }
        break;
        
      case 'avk':
        if (data.suspension.includes('suspender')) {
          recommendation.message = 'Suspender 5 días antes, INR objetivo <1.5';
          recommendation.details = [
            'Monitorear INR 24h antes del procedimiento',
            isHighRisk ? 'Considerar bridging con HBPM' : 'Sin bridging necesario'
          ];
        }
        break;
        
      case 'aspirina':
        if (data.suspension === 'continuar') {
          recommendation.message = 'Continuar aspirina en dosis bajas';
          recommendation.details = ['Beneficio cardiovascular supera riesgo de sangrado'];
        } else if (data.suspension.includes('suspender')) {
          recommendation.message = 'Suspender 7 días antes si alto riesgo de sangrado';
          recommendation.details = ['Evaluar riesgo trombótico vs hemorrágico'];
        }
        break;
        
      case 'dapt':
        if (data.suspension.includes('suspender')) {
          recommendation.message = 'Manejo complejo - consultar cardiología';
          recommendation.details = [
            'Evaluar tiempo desde stent',
            'Considerar continuar aspirina y suspender P2Y12',
            'Procedimiento alto riesgo puede requerir posposición'
          ];
          recommendation.type = 'warning';
        }
        break;
        
      case 'glp1_agonistas':
        if (data.suspension.includes('suspender')) {
          recommendation.message = 'Suspender día de la cirugía';
          recommendation.details = [
            'Retraso en vaciamiento gástrico',
            'Riesgo de broncoaspiración',
            'Reanudar cuando tolere vía oral'
          ];
        }
        break;
        
      case 'sglt2_inhibidores':
        if (data.suspension.includes('suspender')) {
          recommendation.message = 'Suspender 24-48h antes del procedimiento';
          recommendation.details = [
            'Riesgo de cetoacidosis euglucémica',
            'Monitorear cetonas si disponible',
            'Reanudar cuando estable y tolerando VO'
          ];
        }
        break;
      default:
        recommendation.message = 'Medicamento no reconocido';
        recommendation.type = 'warning';
        break;
    }

    return recommendation;
  };

  const getCategory = (medication) => {
    if (['heparina_no_fraccionada', 'hbpm', 'noacs', 'avk'].includes(medication)) {
      return 'Anticoagulantes';
    }
    if (['aspirina', 'dapt'].includes(medication)) {
      return 'Antiplaquetarios';
    }
    return 'Otros Medicamentos';
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Info;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const recommendations = generateRecommendations();
  const groupedRecommendations = recommendations.reduce((acc, rec) => {
    if (!acc[rec.category]) acc[rec.category] = [];
    acc[rec.category].push(rec);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-medical-primary/10 rounded-lg">
          <Pill className="w-5 h-5 text-medical-primary" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Recomendaciones Preoperatorias</h2>
      </div>

      {/* Patient Summary */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Resumen del Paciente</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Edad:</span>
            <span className="ml-2 text-gray-600">{formData.edad || 'No especificada'} años</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Sexo:</span>
            <span className="ml-2 text-gray-600 capitalize">{formData.sexo || 'No especificado'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Peso:</span>
            <span className="ml-2 text-gray-600">{formData.peso || 'No especificado'} kg</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">CrCl:</span>
            <span className="ml-2 text-gray-600">{formData.creatinina_clearance || 'No calculado'} ml/min</span>
          </div>
        </div>
      </div>

      {/* Recommendations by Category */}
      {Object.entries(groupedRecommendations).map(([category, recs]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            {category}
          </h3>
          
          <div className="space-y-3">
            {recs.map((rec, index) => {
              const Icon = getIcon(rec.type);
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getTypeColor(rec.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="mt-1">{rec.message}</p>
                      
                      {rec.details && rec.details.length > 0 && (
                        <ul className="mt-2 text-sm space-y-1">
                          {rec.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <span className="w-1 h-1 bg-current rounded-full"></span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}


    </div>
  );
};

export default ResultsDisplay;