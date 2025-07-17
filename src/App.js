import React, { useState } from 'react';
import { Calculator, Stethoscope, Activity, User } from 'lucide-react';
import './App.css';
import MedicationForm from './components/MedicationForm';
import ResultsDisplay from './components/ResultsDisplay';
import CrClCalculator from './components/CrClCalculator';
import DecisionTree from './components/DecisionTree';

const App = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [showCrClCalculator, setShowCrClCalculator] = useState(false);
  const [formData, setFormData] = useState({
    edad: '',
    sexo: '',
    peso: '',
    altura: '',
    creatinina_serica: '',
    creatinina_clearance: '',
    tipo_cirugia: '',
    riesgo_sangrado: '',
    riesgo_trombotico: '',
    medications: {
      heparina_no_fraccionada: {},
      hbpm: {},
      noacs: {},
      avk: {},
      aspirina: {},
      dapt: {},
      glp1_agonistas: {},
      sglt2_inhibidores: {}
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFactorChange = (medication, factor, value) => {
    setFormData(prev => ({
      ...prev,
      medications: {
        ...prev.medications,
        [medication]: {
          ...prev.medications[medication],
          [factor]: value
        }
      }
    }));
  };

  const calculateCrCl = (crClValue) => {
    setFormData(prev => ({
      ...prev,
      creatinina_clearance: crClValue.toFixed(1)
    }));
    setShowCrClCalculator(false);
  };

  const tabs = [
    { id: 'form', label: 'Formulario', icon: User },
    { id: 'results', label: 'Resultados', icon: Activity },
    { id: 'tree', label: 'Árbol de Decisión', icon: Stethoscope }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-[#CB182E] to-medical-accent text-white shadow-lg overflow-hidden">
        {/* Red Ribbon */}
        <div className="absolute top-0 left-0 w-full h-12 bg-[#CB182E] transform -skew-y-1 origin-top-left"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Calculadora Preoperatoria</h1>
                <p className="text-white/90 text-base">Manejo de medicamentos basado en guías ESAIC 2025</p>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end space-y-1 relative z-10">
              <div className="bg-medical-primary px-4 py-2 rounded-lg shadow-lg">
                <span className="text-white font-medium">Dr. Jose Miguel Gloria Escobar</span>
              </div>
              <span className="text-white/90 font-medium">Dr. Salomon David Gloria Escobar</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-medical-primary text-medical-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'form' && (
            <MedicationForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleFactorChange={handleFactorChange}
              onOpenCrClCalculator={() => setShowCrClCalculator(true)}
            />
          )}
          
          {activeTab === 'results' && (
            <ResultsDisplay formData={formData} />
          )}
          
          {activeTab === 'tree' && (
            <DecisionTree patientData={formData} />
          )}
        </div>
      </main>

      {/* CrCl Calculator Modal */}
      {showCrClCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <CrClCalculator
              onCalculate={calculateCrCl}
              onClose={() => setShowCrClCalculator(false)}
              initialData={{
                edad: formData.edad,
                peso: formData.peso,
                sexo: formData.sexo,
                creatinina: formData.creatinina_serica
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-semibold mb-2">Calculadora Preoperatoria - ESAIC 2025</p>
              <p>Herramienta de apoyo clínico para el manejo preoperatorio de medicamentos</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Referencia:</strong>
              </p>
              <a 
                href="https://journals.lww.com/ejanaesthesiology/fulltext/2025/01000/preoperative_assessment_of_adults_undergoing.1.aspx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-medical-primary hover:text-medical-secondary text-sm font-medium underline"
              >
                Guías ESAIC 2025 - European Journal of Anaesthesiology
              </a>
            </div>
            
            <div className="mt-4 text-xs text-gray-400">
              <p className="mt-1">
                <span className="font-medium">Dr. Jose Miguel Gloria Escobar</span>
              </p>
              <p className="mt-1">
                <span className="font-medium">Dr. Salomon David Gloria Escobar</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;