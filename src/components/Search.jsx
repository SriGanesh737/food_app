import React,{useState} from 'react'
import { useGlobalContext } from '../context';

export default function Search() {

  const [text, setText] = useState('');

  const { setSearchTerm,fetchRandomMeal } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

   if (text != '')
    setSearchTerm(text);
  }
  const handleRandomMeal = () => {
    setSearchTerm('');
    setText('');
    fetchRandomMeal();
  }

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange}  type='text' placeholder='Enter your favourite meal' className='form-input'></input>
        <button  type='submit' className='btn'>Search</button>
        <button onClick={handleRandomMeal} type='button' className='btn btn-hipster'>Surprise Me</button>

      </form>
    </header>
  )
}
