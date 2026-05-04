import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Sparkles, Download, List, Layout, PenTool, Type } from 'lucide-react'

const ArticleGenerator = () => {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState('')

  const generateArticle = async () => {
    if (!topic) return
    setLoading(true)
    // Simulating AI generation
    await new Promise(r => setTimeout(r, 2000))
    setArticle(`
# Impact of Genetic Engineering on ${topic}

## Abstract
This paper examines the recent advancements in agricultural biotechnology, specifically focusing on the integration of CRISPR-Cas9 systems within the ${topic} framework. Our results suggest a significant increase in resilience and nutritional value.

## Introduction
Agriculture is facing unprecedented challenges due to climate change. The ability to manipulate plant DNA at the molecular level provides a promising solution...

## Methodology
Using the AgriDNA LSTM model, we identified key genetic markers associated with yield optimization. 

## Results
Preliminary data indicates a 24% increase in photosynthetic efficiency...

## Conclusion
The future of food security lies in the precise application of genomic tools.
    `)
    setLoading(false)
  }

  return (
    <div className="py-12 container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-4 text-primary-600 font-bold tracking-widest text-sm uppercase">
            <Sparkles className="w-5 h-5" />
            <span>AI Research Assistant</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Scientific Article Generator</h1>
          <p className="text-slate-600 text-lg">Helping researchers structure and draft their academic publications with AI assistance.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <PenTool className="w-4 h-4 mr-2" /> Drafting Parameters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Research Topic</label>
                  <input 
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="e.g. Drought resistance in Rice"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Article Style</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
                    <option>Standard Academic (IMRAD)</option>
                    <option>Case Study</option>
                    <option>Literature Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Keywords</label>
                  <input 
                    type="text"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                    placeholder="CRISPR, LSTM, Yield..."
                  />
                </div>
                <button 
                  onClick={generateArticle}
                  disabled={loading || !topic}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary-200"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span>Generate Draft</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl text-white">
              <h4 className="font-bold mb-4 flex items-center">
                <Layout className="w-4 h-4 mr-2" /> Section Checklist
              </h4>
              <ul className="space-y-3">
                <ChecklistItem label="Abstract & Keywords" checked={!!article} />
                <ChecklistItem label="Literature Review" checked={!!article} />
                <ChecklistItem label="Methodology" checked={!!article} />
                <ChecklistItem label="Data Visualizations" checked={false} />
              </ul>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50/50 rounded-t-3xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="ml-4 text-xs font-medium text-slate-500">article_draft_2026.md</span>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">
                  <Download className="w-3 h-3" />
                  <span>Export PDF</span>
                </button>
              </div>
              
              <div className="p-10 flex-grow prose prose-slate max-w-none font-serif overflow-y-auto max-h-[600px]">
                {article ? (
                  <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                    {article}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center py-20">
                    <FileText className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-sm">Enter parameters and generate to see your article draft.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChecklistItem = ({ label, checked }) => (
  <li className="flex items-center space-x-3 text-sm">
    <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-primary-500 border-primary-500' : 'border-slate-700'}`}>
      {checked && <div className="w-1.5 h-2.5 border-r-2 border-b-2 border-white rotate-45 mb-1" />}
    </div>
    <span className={checked ? 'text-white' : 'text-slate-500'}>{label}</span>
  </li>
)

export default ArticleGenerator
