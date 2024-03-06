import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {

  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false)
  const [isCharactersAllowed, setIsCharactersAllowed] = useState(false)

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() =>{
    let pass = '';
    let str ='ABCDEFGHIJKLMNOPQESTUVWXYZabcdefghijklmnopqrstuv'
    if(isNumbersAllowed) str += '0123456789'
    if(isCharactersAllowed) str += '{}[]!@#$%^&*+_()'


    for(let i = 1; i <= length ; i++){
      let randomCharacter = Math.floor((Math.random() * str.length) + 1)
      pass += str.charAt(randomCharacter)
    }
  
    setPassword(pass)
  },[length,isCharactersAllowed,isNumbersAllowed,setPassword])

  const handleCopyClipboard = useCallback(()=>{
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,100)
    navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,isCharactersAllowed,isNumbersAllowed,passwordGenerator])




  return (
    <div className='bg-[#1E2434] p-3 w-fit rounded-sm flex flex-col gap-4 '>
      <h1 className='text-white'>Password Generator</h1>

      <div className='flex align-middle justify-center'>
        <input 
        type="text"
        value={password}
        placeholder='Password'
        ref={passwordRef}
        className=' border-none outline-none px-3 py-1 rounded-r-none rounded-lg w-[20rem] text-sm'
        readOnly
         />
         <button
         onClick={handleCopyClipboard}
         className=' bg-[#1A49D8] text-white rounded-l-none rounded-lg p-2  text-sm'
         >copy</button>
      </div>

      <div className='text-[#BD6330] flex gap-2 flex-wrap'>
        <input
          type="range"
          min='8'
          max='99'
          value={length}
          className=' cursor-pointer '
          onChange={(e) => {
            setLength(e.target.value)
          }}
        />

        <label>
          Length: {length}
        </label>

        <div>
          <input
            type="checkbox"
            onChange={() => {
              setIsNumbersAllowed((prev) => !prev)
            }}
            className=' cursor-pointer' />
          <label>Numbers</label>
        </div>

        <div>
          <input
            type="checkbox"
            onChange={() => {
              setIsCharactersAllowed((prev) => !prev)
            }} 
            className=' cursor-pointer'/>
          <label>Characters</label>
        </div>


      </div>
    </div>
  )
}

export default App
