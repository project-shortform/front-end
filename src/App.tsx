import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {KakaoLogo} from "./assets/svgComponents";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <KakaoLogo width={18} height={18} />
    </>
  )
}

export default App
