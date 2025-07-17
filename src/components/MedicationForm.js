import React from 'react';
import { Pill, Activity, Calculator, Stethoscope } from 'lucide-react';

const MedicationForm = ({ formData, handleInputChange, handleFactorChange, onCalculateCrCl }) => {
  return (
    <div className="p-6 space-y-8">
      {/* Patient Information */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-medical-primary/10 rounded-lg">
            <Stethoscope className="w-5 h-5 text-medical-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Información del Paciente</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad (años)
            </label>
            <input
              type="number"
              value={formData.edad}
              onChange={(e) => handleInputChange('edad', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
              placeholder="Ej: 65"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sexo
            </label>
            <select
              value={formData.sexo}
              onChange={(e) => handleInputChange('sexo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              value={formData.peso}
              onChange={(e) => handleInputChange('peso', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
              placeholder="Ej: 70"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura (cm)
            </label>
            <input
              type="number"
              value={formData.altura}
              onChange={(e) => handleInputChange('altura', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
              placeholder="Ej: 170"
            />
          </div>
        </div>
      </div>

      {/* Laboratory Values */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-medical-primary/10 rounded-lg">
            <Activity className="w-5 h-5 text-medical-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Valores de Laboratorio</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creatinina Sérica (mg/dL)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.creatinina_serica}
              onChange={(e) => handleInputChange('creatinina_serica', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
              placeholder="Ej: 1.2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aclaramiento de Creatinina (ml/min)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={formData.creatinina_clearance}
                onChange={(e) => handleInputChange('creatinina_clearance', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
                placeholder="Calculado automáticamente"
                readOnly
              />
              <button
                type="button"
                onClick={onCalculateCrCl}
                className="px-4 py-2 bg-medical-primary text-white rounded-md hover:bg-medical-secondary transition-colors flex items-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Calcular</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Surgical Information */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-medical-primary/10 rounded-lg">
            <Pill className="w-5 h-5 text-medical-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Información Quirúrgica</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cirugía
            </label>
            <select
              value={formData.tipo_cirugia}
              onChange={(e) => handleInputChange('tipo_cirugia', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
            >
              <option value="">Seleccionar</option>
              <option value="mayor">Cirugía Mayor</option>
              <option value="menor">Cirugía Menor</option>
              <option value="urgencia">Urgencia</option>
              <option value="ambulatoria">Ambulatoria</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Riesgo de Sangrado
            </label>
            <select
              value={formData.riesgo_sangrado}
              onChange={(e) => handleInputChange('riesgo_sangrado', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
            >
              <option value="">Seleccionar</option>
              <option value="bajo">Bajo</option>
              <option value="moderado">Moderado</option>
              <option value="alto">Alto</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Riesgo Trombótico
            </label>
            <select
              value={formData.riesgo_trombotico}
              onChange={(e) => handleInputChange('riesgo_trombotico', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary"
            >
              <option value="">Seleccionar</option>
              <option value="bajo">Bajo</option>
              <option value="moderado">Moderado</option>
              <option value="alto">Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Medications */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Medicamentos Actuales</h2>
        
        <div className="space-y-6">
          {/* Anticoagulants */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Anticoagulantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['heparina_no_fraccionada', 'hbpm', 'noacs', 'avk'].map((med) => {
                const displayNames = {
                  'heparina_no_fraccionada': 'Heparina No Fraccionada',
                  'hbpm': 'Heparina de Bajo Peso Molecular (HBPM)',
                  'noacs': 'NOAC',
                  'avk': 'AVK'
                };
                return (
                <div key={med} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {displayNames[med]}
                  </h4>
                                    <select
                    value={formData.medications[med]?.toma || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleFactorChange(med, 'toma', value);
                      if (value === 'toma') {
                        if (med === 'avk') {
                          const hasINR = window.confirm('¿INR actual disponible?');
                          if (hasINR) {
                            const inrValue = window.prompt('Ingrese el valor de INR:');
                            if (inrValue) handleFactorChange(med, 'inr', parseFloat(inrValue));
                          }
                        }
                      } else {
                        // Clear extra data if 'no toma'
                        handleFactorChange(med, 'inr', null);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary"
                  >
                    <option value="">No toma</option>
                    <option value="toma">Toma</option>
                  </select>
                 </div>
                 );
               })}
             </div>
          </div>

          {/* Antiplatelets */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Antiplaquetarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['aspirina', 'dapt'].map((med) => {
                const displayNames = {
                  'aspirina': 'Aspirina',
                  'dapt': 'DAPT (Doble terapia antiplaquetaria)'
                };
                return (
                <div key={med} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {displayNames[med]}
                  </h4>
                                    <select
                    value={formData.medications[med]?.toma || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleFactorChange(med, 'toma', value);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary"
                  >
                    <option value="">No toma</option>
                    <option value="toma">Toma</option>
                  </select>
                 </div>
                 );
               })}
             </div>
          </div>

          {/* Other Medications */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Otros Medicamentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['glp1_agonistas', 'sglt2_inhibidores'].map((med) => {
                const displayNames = {
                  'glp1_agonistas': 'Agonistas GLP-1',
                  'sglt2_inhibidores': 'Inhibidores SGLT2'
                };
                return (
                <div key={med} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {displayNames[med]}
                  </h4>
                                    <select
                    value={formData.medications[med]?.toma || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleFactorChange(med, 'toma', value);
                      if (value === 'toma') {
                        if (med === 'sglt2_inhibidores') {
                          const hasBOHB = window.confirm('¿BOHB disponible?');
                          if (hasBOHB) {
                            const bohbValue = window.prompt('Ingrese el valor de BOHB (mmol/L):');
                            if (bohbValue) handleFactorChange(med, 'bohb', parseFloat(bohbValue));
                          }
                        }
                      } else {
                        // Clear extra data if 'no toma'
                        handleFactorChange(med, 'bohb', null);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary"
                  >
                    <option value="">No toma</option>
                    <option value="toma">Toma</option>
                   </select>
                 </div>
                 );
               })}
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default MedicationForm;