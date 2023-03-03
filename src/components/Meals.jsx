import React, { useContext } from 'react'
import { BsHandThumbsUp } from 'react-icons/bs';

// import { AppContext } from '../context'
import { useGlobalContext } from '../context'

export default function Meals( {children} ) {

  const { meals, loading,selectMeal,addToFavorites } = useGlobalContext();



  if (loading) return <section className='section'>
    <h4>Loading...</h4>
  </section>

  if (meals.length < 1) return <section className='section'>
    <h4>No items matched the search results please try again!!!</h4>
  </section>
  return (
    <section className='section-center'>
      {children}
      {
        meals.map((singleMeal) => {
          const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
          return <article className='single-meal' key={idMeal}>
            <img src={image} className='img' onClick={()=>{selectMeal(idMeal)}}  />
            <footer>
              <h5>{title}</h5>
              <button className='like-btn'onClick={()=>addToFavorites(idMeal)}><BsHandThumbsUp/></button>
            </footer>
          </article>
        })
      }

    </section>
  )
}
