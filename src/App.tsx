import { useState } from 'react'
import { HeroSection } from '@/sections/HeroSection'
import { ScenariosSection } from '@/sections/ScenariosSection'
import { PersonalizationSection } from '@/sections/PersonalizationSection'  // ← AGGIUNGI
import { DataUploader } from '@/components/cfd/DataUploader'

function App() {
  const [data, setData] = useState<any>(null)

  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <ScenariosSection />
      <PersonalizationSection />  
      
    </div>
  )
}

export default App