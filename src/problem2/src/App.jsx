import StarsCanvas from "./components/canvas/Star"
import CurrencyExchangeForm from "./components/CurrencyExchangeForm"

function App() {

  return (
    <div className="h-[100vh] bg-black relative font-mono w-full flex justify-center items-center">
      <CurrencyExchangeForm />
      <StarsCanvas />
    </div>
  )
}

export default App
