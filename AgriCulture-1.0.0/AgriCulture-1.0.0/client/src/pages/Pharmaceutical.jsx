import React from 'react'
import { motion } from 'framer-motion'
import { Microscope, Activity, Droplets, Thermometer, Shield } from 'lucide-react'

const Pharmaceutical = () => {
  return (
    <div className="py-12 container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-4 text-emerald-600 font-bold tracking-widest text-sm uppercase">
            <Microscope className="w-5 h-5" />
            <span>Biopharming Division</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Plant-Derived Pharmaceuticals</h1>
          <p className="text-slate-600 text-lg">Engineering bio-factories: Producing insulin and complex proteins within plant tissues.</p>
        </header>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Insulin in Plants</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                By integrating the human proinsulin gene into the chloroplast genome of tobacco or lettuce plants, we achieve high-level expression while ensuring biological containment.
              </p>
              
              <div className="space-y-6 mb-10">
                <ProcessStep icon={<Droplets className="text-blue-500" />} title="Protein Extraction" desc="Advanced purification protocols for clinical grade output." />
                <ProcessStep icon={<Thermometer className="text-red-500" />} title="Thermal Stability" desc="Plant-produced proteins show 2x stability in ambient temperatures." />
                <ProcessStep icon={<Shield className="text-emerald-500" />} title="Bio-Safety" desc="Multi-layer containment to prevent environmental cross-pollination." />
              </div>

              <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                View Case Study: Insulin-B
              </button>
            </div>
            <div className="md:w-1/2 bg-slate-100 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1000" 
                alt="Plant cells under microscope" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="text-3xl font-black mb-1">94.8%</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-80">Expression Efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <HighlightCard title="Scale-up" value="10k+ Liters" label="Bio-reactor capacity" />
          <HighlightCard title="Cost Reduction" value="-70%" label="Compared to Mammalian cells" />
          <HighlightCard title="FDA Stage" value="Phase II" label="Clinical Trials Status" />
        </div>
      </div>
    </div>
  )
}

const ProcessStep = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  </div>
)

const HighlightCard = ({ title, value, label }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm">
    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{title}</div>
    <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
    <div className="text-xs text-slate-500">{label}</div>
  </div>
)

export default Pharmaceutical
