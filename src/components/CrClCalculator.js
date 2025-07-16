import React, { useState } from 'react';
import { X, Calculator, User, Weight, Ruler, TestTube } from 'lucide-react';

const CrClCalculator = ({ onClose, onCalculate }) => {
  const [formData, setFormData] = useState({
    sex: '',
    age: '',
    weight: '',
    creatinine: '',
    height: ''
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.sex) newErrors.sex = 'Sexo es requerido';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Edad válida es requerida';
    if (!formData.weight || formData.weight <= 0) newErrors.weight = 'Peso válido es requerido';
    if (!formData.creatinine || formData.creatinine <= 0) newErrors.creatinine = 'Creatinina válida es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCrCl = () => {
    if (!validateForm()) return;

    const { sex, age, weight, creatinine, height } = formData;
    
    let calcWeight = parseFloat(weight);
    
    // Adjust weight if height is provided (using adjusted body weight for obesity)
    if (height) {
      const heightCm = parseFloat(height);
      const heightIn = heightCm / 2.54;
      
      // Calculate ideal body weight
      let ibw = sex === 'male' 
        ? 50 + 2.3 * (heightIn - 60) 
        : 45.5 + 2.3 * (heightIn - 60);
      
      // Use adjusted body weight if actual weight > IBW
      if (calcWeight > ibw) {
        calcWeight = ibw + 0.4 * (calcWeight - ibw);
      }
    }
    
    // Cockcroft-Gault equation
    let crCl = ((140 - parseFloat(age)) * calcWeight) / (72 * parseFloat(creatinine));
    
    // Apply female correction factor
    if (sex === 'female') {
      crCl *= 0.85;
    }
    
    const roundedCrCl = Math.round(crCl);
    setResult({
      value: roundedCrCl,
      weightUsed: Math.round(calcWeight),
      formula: `CrCl = ((140 - ${age}) × ${Math.round(calcWeight)}) / (72 × ${creatinine})${sex === 'female' ? ' × 0.85' : ''}`
    });
  };

  const handleUseResult = () => {
    if (result) {
      onCalculate(result.value);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-medical-primary to-medical-accent px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Calculadora de CrCl
                  </h3>
                  <p className="text-white/90 text-sm">Ecuación Cockcroft-Gault</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-medical-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Sexo *
                </label>
                <select 
                  name="sex" 
                  value={formData.sex}
                  onChange={handleChange} 
                  className={`medical-select ${errors.sex ? 'border-red-300 focus:border-red-500' : ''}`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                </select>
                {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
              </div>

              {/* Age and Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-medical-gray-700 mb-2">
                    Edad *
                  </label>
                  <input 
                    type="number" 
                    name="age" 
                    value={formData.age}
                    onChange={handleChange} 
                    className={`medical-input ${errors.age ? 'border-red-300 focus:border-red-500' : ''}`}
                    placeholder="65"
                    min="1"
                    max="120"
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  <p className="text-xs text-medical-gray-500 mt-1">años</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-medical-gray-700 mb-2">
                    <Weight className="w-4 h-4 inline mr-1" />
                    Peso *
                  </label>
                  <input 
                    type="number" 
                    name="weight" 
                    value={formData.weight}
                    onChange={handleChange} 
                    className={`medical-input ${errors.weight ? 'border-red-300 focus:border-red-500' : ''}`}
                    placeholder="70"
                    min="1"
                    max="300"
                    step="0.1"
                  />
                  {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                  <p className="text-xs text-medical-gray-500 mt-1">kg</p>
                </div>
              </div>

              {/* Creatinine */}
              <div>
                <label className="block text-sm font-medium text-medical-gray-700 mb-2">
                  <TestTube className="w-4 h-4 inline mr-1" />
                  Creatinina sérica *
                </label>
                <input 
                  type="number" 
                  name="creatinine" 
                  value={formData.creatinine}
                  onChange={handleChange} 
                  className={`medical-input ${errors.creatinine ? 'border-red-300 focus:border-red-500' : ''}`}
                  placeholder="1.0"
                  min="0.1"
                  max="20"
                  step="0.1"
                />
                {errors.creatinine && <p className="text-red-500 text-sm mt-1">{errors.creatinine}</p>}
                <p className="text-xs text-medical-gray-500 mt-1">mg/dL (Normal: 0.7-1.3)</p>
              </div>

              {/* Height (optional) */}
              <div>
                <label className="block text-sm font-medium text-medical-gray-700 mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Altura (opcional)
                </label>
                <input 
                  type="number" 
                  name="height" 
                  value={formData.height}
                  onChange={handleChange} 
                  className="medical-input" 
                  placeholder="170"
                  min="100"
                  max="250"
                />
                <p className="text-xs text-medical-gray-500 mt-1">cm (para ajuste por peso corporal ideal)</p>
              </div>

              {/* Calculate Button */}
              <button 
                onClick={calculateCrCl}
                className="medical-button w-full flex items-center justify-center"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular CrCl
              </button>

              {/* Result */}
              {result && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Resultado</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-700">
                      <strong>CrCl = {result.value} ml/min</strong>
                    </p>
                    <p className="text-green-600">Peso usado: {result.weightUsed} kg</p>
                    <p className="text-green-600 text-xs font-mono bg-white/50 p-2 rounded">
                      {result.formula}
                    </p>
                  </div>
                  
                  {/* Interpretation */}
                  <div className="mt-3 p-3 bg-white/60 rounded border border-green-300">
                    <p className="text-xs text-green-700">
                      <strong>Interpretación:</strong>{' '}
                      {result.value >= 90 ? 'Normal' :
                       result.value >= 60 ? 'Levemente disminuido' :
                       result.value >= 30 ? 'Moderadamente disminuido' :
                       result.value >= 15 ? 'Severamente disminuido' :
                       'Falla renal terminal'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-medical-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="medical-button-secondary"
            >
              Cancelar
            </button>
            {result && (
              <button 
                onClick={handleUseResult}
                className="medical-button"
              >
                Usar Resultado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrClCalculator;