import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

 
  async function handleSubmit () {
  
    if (input == '') {
      alert('Preencha com algum CEP')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    } catch (error) {
      alert("Digite um CEP valido!")
      setInput('')
    }
    
  }

  function handleKeyPress (ev) {
    if (ev.key === 'Enter') {
      handleSubmit()
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..." id='input' value={input} onChange={ (ev) => setInput(ev.target.value) } onKeyDown={handleKeyPress}/>
        <button className="buttonSearch"><FiSearch size={25} color='#FFF' onClick={handleSubmit}/></button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>      
          <span>{cep.logradouro}</span>
          <span>Complemento : {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD : {cep.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
