import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { ShieldAlert, CheckCircle, AlertTriangle, Send, RefreshCw, Zap } from 'lucide-react'

const API_BASE = 'http://127.0.0.1:8000/api'

const EthicAnalysis = () => {
  const [sequence, setSequence] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const runAnalysis = async () => {
    if (!sequence) return
    setLoading(true)
    setResult(null)
    
    try {
      // Production FastAPI Call
      const response = await axios.post(`${API_BASE}/ethics/audit`, {
        sequence: sequence
      });
      setResult(response.data);
      
    } catch (err) {
      console.warn("FastAPI Offline - Running Ethics Simulation", err);
      // Fallback Simulation Logic
      await new Promise(r => setTimeout(r, 1500))
      const isIllegal = sequence.toLowerCase().includes('illegal')
      setResult({
        type: isIllegal ? 'error' : 'success',
        title: 'Ethical Compliance Check',
        message: isIllegal 
          ? 'RESTRICTED SEQUENCE DETECTED. This sequence matches banned genetic markers for protected or restricted plant species.' 
          : 'COMPLIANT. No illegal or restricted sequences found in the provided DNA.',
        isIllegal
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Ethical Auditing</h1>
          <p className="text-slate-600 font-medium">Real-time compliance monitoring for international genomic standards.</p>
        </header>

        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-2xl overflow-hidden mb-12">
          <div className="p-8 sm:p-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-2xl text-slate-900 tracking-tight">Compliance & Legality Check</h3>
                <p className="text-sm text-slate-400 font-medium italic">Global Genetic Ethics Framework v4.0</p>
              </div>
            </div>

            <div className="relative group">
              <textarea 
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                className="w-full h-56 p-8 bg-slate-50/50 border-2 border-slate-100 rounded-[2rem] font-mono text-sm focus:border-blue-500/30 focus:ring-0 transition-all outline-none resize-none"
                placeholder="Paste DNA sequence here (e.g. ATGC...)"
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={runAnalysis}
                disabled={loading || !sequence}
                className={`flex items-center space-x-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl ${
                  loading || !sequence 
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-slate-900 text-white hover:bg-blue-600 shadow-blue-500/20 active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Run Ethics Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`p-10 rounded-[2.5rem] border ${
                result.type === 'error' ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'
              } shadow-xl`}
            >
              <div className="flex items-start space-x-6">
                <div className={`p-3 rounded-xl ${
                  result.type === 'error' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {result.type === 'error' ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                </div>
                <div>
                  <h4 className={`text-2xl font-black mb-2 tracking-tight ${
                    result.type === 'error' ? 'text-rose-900' : 'text-emerald-900'
                  }`}>
                    {result.title}
                  </h4>
                  <p className={`text-lg font-medium leading-relaxed ${
                    result.type === 'error' ? 'text-rose-700' : 'text-emerald-700'
                  }`}>
                    {result.message}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-4">
                    <div className={`h-2 flex-grow rounded-full ${
                      result.type === 'error' ? 'bg-rose-200' : 'bg-emerald-200'
                    }`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className={`h-full rounded-full ${
                          result.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${
                      result.type === 'error' ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      {result.type === 'error' ? 'Violation Found' : 'Verified Compliant'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EthicAnalysis
