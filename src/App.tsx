import Button from "./components/Button"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Button onClick={() => alert("Funcionando!")}>
        Clique aqui
      </Button>
    </div>
  )
}

export default App
