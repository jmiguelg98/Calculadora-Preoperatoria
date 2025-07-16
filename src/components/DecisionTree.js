import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer';
import { GitBranch, Download } from 'lucide-react';

const DecisionTree = ({ patientData }) => {
  const flowchart = useMemo(() => {
    const nodes = [
      // Root node
      { 
        id: '1', 
        data: { label: 'Evaluación Preoperatoria\n(ESAIC 2025)' }, 
        position: { x: 400, y: 20 },
        style: { 
          background: 'linear-gradient(135deg, #CB182E, #CC2236)', 
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '200px',
          boxShadow: '0 4px 6px -1px rgba(203, 24, 46, 0.3)'
        }
      },
      
      // Risk assessment
      { 
        id: '2', 
        data: { label: 'Evaluación del\nRiesgo de Sangrado' }, 
        position: { x: 400, y: 120 },
        style: { 
          background: '#F3F4F6', 
          border: '2px solid #CB182E',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '13px',
          fontWeight: '500',
          textAlign: 'center',
          width: '160px'
        }
      },
      
      // Risk levels
      { 
        id: '3', 
        data: { label: 'Riesgo BAJO\n(ej. cataratas,\nendoscopia)' }, 
        position: { x: 200, y: 220 },
        style: { 
          background: '#ECFDF5', 
          border: '2px solid #10B981',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '12px',
          textAlign: 'center',
          width: '140px'
        }
      },
      { 
        id: '4', 
        data: { label: 'Riesgo ALTO\n(ej. neurocirugía,\ncirugía mayor)' }, 
        position: { x: 600, y: 220 },
        style: { 
          background: '#FEF2F2', 
          border: '2px solid #EF4444',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '12px',
          textAlign: 'center',
          width: '140px'
        }
      },
      
      // Medication categories
      { 
        id: '5', 
        data: { label: 'ANTICOAGULANTES\n• HNF: 4-6h\n• HBPM: 12-24h\n• NOAC: 24-48h\n• AVK: INR <1.5' }, 
        position: { x: 50, y: 340 },
        style: { 
          background: '#EFF6FF', 
          border: '2px solid #3B82F6',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '11px',
          textAlign: 'left',
          width: '160px'
        }
      },
      { 
        id: '6', 
        data: { label: 'ANTIPLAQUETARIOS\n• Aspirina: Continuar\n• DAPT: Suspender P2Y12\n• Considerar stent' }, 
        position: { x: 250, y: 340 },
        style: { 
          background: '#F0FDF4', 
          border: '2px solid #22C55E',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '11px',
          textAlign: 'left',
          width: '160px'
        }
      },
      { 
        id: '7', 
        data: { label: 'GLP-1 AGONISTAS\n• Diario: 1 día antes\n• Semanal: 1 semana\n• Evaluar estómago' }, 
        position: { x: 550, y: 340 },
        style: { 
          background: '#FFFBEB', 
          border: '2px solid #F59E0B',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '11px',
          textAlign: 'left',
          width: '160px'
        }
      },
      { 
        id: '8', 
        data: { label: 'SGLT2 INHIBIDORES\n• Suspender 3-4 días\n• Verificar BOHB\n• Prevenir CAD' }, 
        position: { x: 750, y: 340 },
        style: { 
          background: '#FDF2F8', 
          border: '2px solid #EC4899',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '11px',
          textAlign: 'left',
          width: '160px'
        }
      },
      
      // Special considerations
      { 
        id: '9', 
        data: { label: 'CONSIDERACIONES\nESPECIALES' }, 
        position: { x: 400, y: 480 },
        style: { 
          background: '#FEF3C7', 
          border: '2px solid #D97706',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '160px'
        }
      },
      
      // Factors
      { 
        id: '10', 
        data: { label: 'Función Renal\n(CrCl)' }, 
        position: { x: 200, y: 580 },
        style: { 
          background: '#E0F2FE', 
          border: '1px solid #0891B2',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          textAlign: 'center',
          width: '120px'
        }
      },
      { 
        id: '11', 
        data: { label: 'Historia de\nStent/PCI' }, 
        position: { x: 340, y: 580 },
        style: { 
          background: '#F0FDF4', 
          border: '1px solid #16A34A',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          textAlign: 'center',
          width: '120px'
        }
      },
      { 
        id: '12', 
        data: { label: 'INR Actual\n(para AVK)' }, 
        position: { x: 480, y: 580 },
        style: { 
          background: '#FEF2F2', 
          border: '1px solid #DC2626',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          textAlign: 'center',
          width: '120px'
        }
      },
      { 
        id: '13', 
        data: { label: 'Niveles BOHB\n(para SGLT2i)' }, 
        position: { x: 620, y: 580 },
        style: { 
          background: '#FDF4FF', 
          border: '1px solid #A855F7',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          textAlign: 'center',
          width: '120px'
        }
      },
    ];

    const edges = [
      // Main flow
      { id: 'e1-2', source: '1', target: '2', style: { stroke: '#CB182E', strokeWidth: 2 } },
      { id: 'e2-3', source: '2', target: '3', label: 'Bajo', style: { stroke: '#10B981', strokeWidth: 2 } },
      { id: 'e2-4', source: '2', target: '4', label: 'Alto', style: { stroke: '#EF4444', strokeWidth: 2 } },
      
      // Medications
      { id: 'e3-5', source: '3', target: '5', style: { stroke: '#3B82F6', strokeWidth: 1 } },
      { id: 'e3-6', source: '3', target: '6', style: { stroke: '#22C55E', strokeWidth: 1 } },
      { id: 'e4-7', source: '4', target: '7', style: { stroke: '#F59E0B', strokeWidth: 1 } },
      { id: 'e4-8', source: '4', target: '8', style: { stroke: '#EC4899', strokeWidth: 1 } },
      
      // Cross connections for comprehensive care
      { id: 'e3-7', source: '3', target: '7', style: { stroke: '#F59E0B', strokeWidth: 1, strokeDasharray: '5,5' } },
      { id: 'e3-8', source: '3', target: '8', style: { stroke: '#EC4899', strokeWidth: 1, strokeDasharray: '5,5' } },
      { id: 'e4-5', source: '4', target: '5', style: { stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '5,5' } },
      { id: 'e4-6', source: '4', target: '6', style: { stroke: '#22C55E', strokeWidth: 1, strokeDasharray: '5,5' } },
      
      // Special considerations
      { id: 'e5-9', source: '5', target: '9', style: { stroke: '#D97706', strokeWidth: 1 } },
      { id: 'e6-9', source: '6', target: '9', style: { stroke: '#D97706', strokeWidth: 1 } },
      { id: 'e7-9', source: '7', target: '9', style: { stroke: '#D97706', strokeWidth: 1 } },
      { id: 'e8-9', source: '8', target: '9', style: { stroke: '#D97706', strokeWidth: 1 } },
      
      // Factors
      { id: 'e9-10', source: '9', target: '10', style: { stroke: '#0891B2', strokeWidth: 1 } },
      { id: 'e9-11', source: '9', target: '11', style: { stroke: '#16A34A', strokeWidth: 1 } },
      { id: 'e9-12', source: '9', target: '12', style: { stroke: '#DC2626', strokeWidth: 1 } },
      { id: 'e9-13', source: '9', target: '13', style: { stroke: '#A855F7', strokeWidth: 1 } },
    ];

    return { nodes, edges };
  }, []);

  const exportDiagram = () => {
    const data = patientData || {};
    const medications = data.medications || {};
    
    const summary = `
ÁRBOL DE DECISIÓN PREOPERATORIO - ESAIC 2025

Paciente: ${data.edad || 'No especificado'} años, ${data.sexo || 'No especificado'}
Peso: ${data.peso || 'No especificado'} kg, Altura: ${data.altura || 'No especificado'} cm
CrCl: ${data.creatinina_clearance || 'No calculado'} ml/min

MEDICAMENTOS EVALUADOS:
${Object.entries(medications).map(([med, factors]) => 
  `- ${med.toUpperCase()}: ${factors.suspension || 'Continuar'}`).join('\n')}

Generado el ${new Date().toLocaleDateString('es-ES')}
    `;
    
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'decision-preoperatoria.txt';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="medical-card p-6 h-[800px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-medical-primary/10 rounded-lg">
            <GitBranch className="w-5 h-5 text-medical-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-medical-gray-900">Árbol de Decisión Clínica</h2>
            <p className="text-medical-gray-600 text-sm">Flujo de trabajo para manejo preoperatorio</p>
          </div>
        </div>
        <button
          onClick={exportDiagram}
          className="medical-button-secondary flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Exportar</span>
        </button>
      </div>

      <div className="h-full border border-medical-gray-200 rounded-lg overflow-hidden">
        <ReactFlow 
          nodes={flowchart.nodes} 
          edges={flowchart.edges}
          fitView
          attributionPosition="bottom-left"
          defaultZoom={0.8}
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background color="#f1f5f9" gap={20} />
          <Controls className="bg-white border border-medical-gray-200 rounded-lg shadow-medical" />
          <MiniMap 
            nodeColor={(node) => {
              if (node.style?.background) {
                return node.style.background.includes('gradient') ? '#CB182E' : node.style.background;
              }
              return '#CB182E';
            }}
            className="bg-white border border-medical-gray-200 rounded-lg shadow-medical"
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-medical-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-medical-gray-800 mb-3">Leyenda</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
            <span>Anticoagulantes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
            <span>Antiplaquetarios</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
            <span>GLP-1 AGONISTAS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-100 border-2 border-pink-500 rounded"></div>
            <span>SGLT2 INHIBIDORES</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-medical-gray-600">
          <p><strong>Líneas continuas:</strong> Flujo principal | <strong>Líneas punteadas:</strong> Consideraciones adicionales</p>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;