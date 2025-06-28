import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  FileText, 
  Brain, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Heart, 
  Thermometer,
  User,
  Calendar,
  Weight,
  Ruler,
  Stethoscope,
  Pill,
  TrendingUp,
  BarChart3,
  Camera,
  Search,
  Download,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const MedicalDiagnosisAssistant = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    height: '175 cm',
    weight: '80 kg',
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: 98.6,
    symptoms: []
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock medical conditions database
  const medicalConditions = [
    {
      id: 1,
      name: 'Pneumonia',
      symptoms: ['cough', 'fever', 'chest pain', 'shortness of breath'],
      severity: 'High',
      confidence: 0.85,
      treatments: ['Antibiotics', 'Rest', 'Fluids', 'Oxygen therapy'],
      description: 'Infection that inflames air sacs in lungs'
    },
    {
      id: 2,
      name: 'Hypertension',
      symptoms: ['headache', 'dizziness', 'chest pain'],
      severity: 'Medium',
      confidence: 0.72,
      treatments: ['ACE inhibitors', 'Lifestyle changes', 'Diet modification'],
      description: 'High blood pressure condition'
    },
    {
      id: 3,
      name: 'Diabetes Type 2',
      symptoms: ['frequent urination', 'increased thirst', 'fatigue'],
      severity: 'Medium',
      confidence: 0.68,
      treatments: ['Metformin', 'Diet control', 'Exercise', 'Blood sugar monitoring'],
      description: 'Chronic condition affecting blood sugar regulation'
    }
  ];

  // Mock vital signs data for charts
  const vitalSignsData = [
    { time: '08:00', heartRate: 72, bloodPressure: 120, temperature: 98.6 },
    { time: '12:00', heartRate: 78, bloodPressure: 125, temperature: 99.1 },
    { time: '16:00', heartRate: 75, bloodPressure: 118, temperature: 98.8 },
    { time: '20:00', heartRate: 70, bloodPressure: 115, temperature: 98.4 },
  ];

  const riskFactorsData = [
    { name: 'Cardiovascular', value: 35, color: '#ef4444' },
    { name: 'Diabetes', value: 25, color: '#f97316' },
    { name: 'Respiratory', value: 20, color: '#eab308' },
    { name: 'Other', value: 20, color: '#22c55e' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        simulateImageAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResults({
        imageType: 'Chest X-Ray',
        findings: [
          { finding: 'Normal heart size', confidence: 0.92, severity: 'Normal' },
          { finding: 'Clear lung fields', confidence: 0.88, severity: 'Normal' },
          { finding: 'No acute abnormalities', confidence: 0.85, severity: 'Normal' }
        ],
        recommendations: [
          'Continue regular monitoring',
          'Maintain healthy lifestyle',
          'Follow up in 6 months'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const addSymptom = (symptom) => {
    if (!patientData.symptoms.includes(symptom)) {
      setPatientData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptom]
      }));
    }
  };

  const removeSymptom = (symptom) => {
    setPatientData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const getDiagnosisPredictions = () => {
    return medicalConditions.map(condition => {
      const matchingSymptoms = condition.symptoms.filter(symptom =>
        patientData.symptoms.some(patientSymptom =>
          patientSymptom.toLowerCase().includes(symptom.toLowerCase())
        )
      );
      const adjustedConfidence = matchingSymptoms.length > 0 
        ? Math.min(condition.confidence + (matchingSymptoms.length * 0.1), 0.95)
        : condition.confidence * 0.3;
      
      return {
        ...condition,
        confidence: adjustedConfidence,
        matchingSymptoms
      };
    }).sort((a, b) => b.confidence - a.confidence);
  };

  const commonSymptoms = [
    'fever', 'cough', 'headache', 'fatigue', 'chest pain', 'shortness of breath',
    'nausea', 'dizziness', 'abdominal pain', 'joint pain', 'muscle aches', 'sore throat'
  ];

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Stethoscope className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Medical Diagnosis Assistant</h1>
                <p className="text-gray-600">AI-Powered Healthcare Decision Support System</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertTriangle size={20} />
                <span className="text-sm font-medium">For Educational Use Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <TabButton
            id="dashboard"
            label="Dashboard"
            icon={BarChart3}
            isActive={activeTab === 'dashboard'}
            onClick={setActiveTab}
          />
          <TabButton
            id="patient"
            label="Patient Data"
            icon={User}
            isActive={activeTab === 'patient'}
            onClick={setActiveTab}
          />
          <TabButton
            id="imaging"
            label="Medical Imaging"
            icon={Camera}
            isActive={activeTab === 'imaging'}
            onClick={setActiveTab}
          />
          <TabButton
            id="diagnosis"
            label="AI Diagnosis"
            icon={Brain}
            isActive={activeTab === 'diagnosis'}
            onClick={setActiveTab}
          />
          <TabButton
            id="vitals"
            label="Vital Signs"
            icon={Activity}
            isActive={activeTab === 'vitals'}
            onClick={setActiveTab}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Overview */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <User className="text-blue-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-semibold text-gray-800">{patientData.name}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <Calendar className="text-green-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-semibold text-gray-800">{patientData.age} years</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <Heart className="text-purple-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="font-semibold text-gray-800">{patientData.heartRate} bpm</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <Thermometer className="text-orange-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="font-semibold text-gray-800">{patientData.temperature}°F</p>
                </div>
              </div>
              
              {/* Vital Signs Chart */}
              <div className="h-64">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalSignsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Risk Assessment</h2>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskFactorsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {riskFactorsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {riskFactorsData.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: risk.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{risk.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{risk.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Patient Data Tab */}
        {activeTab === 'patient' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={patientData.name}
                      onChange={(e) => setPatientData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={patientData.age}
                      onChange={(e) => setPatientData(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <input
                      type="text"
                      value={patientData.height}
                      onChange={(e) => setPatientData(prev => ({ ...prev, height: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <input
                      type="text"
                      value={patientData.weight}
                      onChange={(e) => setPatientData(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                    <input
                      type="text"
                      value={patientData.bloodPressure}
                      onChange={(e) => setPatientData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate</label>
                    <input
                      type="number"
                      value={patientData.heartRate}
                      onChange={(e) => setPatientData(prev => ({ ...prev, heartRate: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patientData.temperature}
                      onChange={(e) => setPatientData(prev => ({ ...prev, temperature: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Symptoms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Common Symptoms</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {commonSymptoms.map(symptom => (
                      <button
                        key={symptom}
                        onClick={() => addSymptom(symptom)}
                        className="p-2 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Symptoms</h3>
                  <div className="space-y-2">
                    {patientData.symptoms.length === 0 ? (
                      <p className="text-gray-500 italic">No symptoms selected</p>
                    ) : (
                      patientData.symptoms.map(symptom => (
                        <div key={symptom} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                          <span className="text-blue-800">{symptom}</span>
                          <button
                            onClick={() => removeSymptom(symptom)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical Imaging Tab */}
        {activeTab === 'imaging' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Image Upload</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-2">Click to upload medical image</p>
                  <p className="text-sm text-gray-500">Supports X-rays, MRIs, CT scans, etc.</p>
                </label>
              </div>
              
              {uploadedImage && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Uploaded Image</h3>
                  <img
                    src={uploadedImage}
                    alt="Medical scan"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Analysis Results</h2>
              
              {isAnalyzing && (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="animate-spin text-blue-600 mr-3" size={24} />
                  <span className="text-gray-600">Analyzing image...</span>
                </div>
              )}
              
              {analysisResults && !isAnalyzing && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Image Type</h3>
                    <p className="text-blue-600 font-medium">{analysisResults.imageType}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Findings</h3>
                    <div className="space-y-2">
                      {analysisResults.findings.map((finding, index) => (
                        <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="text-green-600" size={16} />
                            <span className="text-gray-800">{finding.finding}</span>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            {Math.round(finding.confidence * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Recommendations</h3>
                    <div className="space-y-2">
                      {analysisResults.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {!analysisResults && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Eye size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Upload a medical image to begin AI analysis</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Diagnosis Tab */}
        {activeTab === 'diagnosis' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Diagnosis Predictions</h2>
            
            <div className="grid gap-6">
              {getDiagnosisPredictions().map((condition, index) => (
                <div key={condition.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        condition.severity === 'High' ? 'bg-red-500' :
                        condition.severity === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{condition.name}</h3>
                        <p className="text-gray-600">{condition.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(condition.confidence * 100)}%
                      </div>
                      <div className="text-sm text-gray-500">Confidence</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Matching Symptoms</h4>
                      {condition.matchingSymptoms.length > 0 ? (
                        <div className="space-y-1">
                          {condition.matchingSymptoms.map(symptom => (
                            <div key={symptom} className="flex items-center space-x-2">
                              <CheckCircle className="text-green-500" size={16} />
                              <span className="text-green-700">{symptom}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No direct symptom matches</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Recommended Treatments</h4>
                      <div className="space-y-1">
                        {condition.treatments.map(treatment => (
                          <div key={treatment} className="flex items-center space-x-2">
                            <Pill className="text-blue-500" size={16} />
                            <span className="text-gray-700">{treatment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <AlertTriangle size={16} />
                      <span>Severity: {condition.severity} | Always consult with healthcare professionals</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vital Signs Tab */}
        {activeTab === 'vitals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Signs Monitoring</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalSignsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={3} name="Heart Rate" />
                    <Line type="monotone" dataKey="bloodPressure" stroke="#10b981" strokeWidth={3} name="Blood Pressure" />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} name="Temperature" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Readings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Heart className="text-blue-600" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800">Heart Rate</p>
                      <p className="text-sm text-gray-600">Current reading</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{patientData.heartRate}</p>
                    <p className="text-sm text-gray-500">bpm</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Activity className="text-green-600" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800">Blood Pressure</p>
                      <p className="text-sm text-gray-600">Systolic/Diastolic</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{patientData.bloodPressure}</p>
                    <p className="text-sm text-gray-500">mmHg</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="text-orange-600" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800">Temperature</p>
                      <p className="text-sm text-gray-600">Body temperature</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">{patientData.temperature}</p>
                    <p className="text-sm text-gray-500">°F</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3">Status Indicators</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Heart Rate</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        patientData.heartRate >= 60 && patientData.heartRate <= 100 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patientData.heartRate >= 60 && patientData.heartRate <= 100 ? 'Normal' : 'Monitor'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Temperature</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        patientData.temperature >= 97.0 && patientData.temperature <= 99.0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patientData.temperature >= 97.0 && patientData.temperature <= 99.0 ? 'Normal' : 'Monitor'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertTriangle className="text-red-500" size={20} />
              <h3 className="text-lg font-semibold text-red-700">Important Medical Disclaimer</h3>
            </div>
            <p className="text-gray-600 text-sm max-w-4xl mx-auto">
              This Medical Diagnosis Assistant is designed for educational and research purposes only. 
              It should never be used as a substitute for professional medical advice, diagnosis, or treatment. 
              All medical decisions should be made by qualified healthcare professionals. The AI predictions 
              and analyses provided are simulated and not based on actual medical AI models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDiagnosisAssistant;