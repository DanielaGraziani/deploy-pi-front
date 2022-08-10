import React from 'react'
import { Link } from 'react-router-dom'
import s from '../styles/Landing.module.css'

export default function LandingPage() {
  return (
    <div className={s.landingContainer}>
      <div className={s.textContainer}>
        <h2 className={s.landingTitle}>Welcome to</h2>
        <div className={s.text}>
            <h1>Recipe Ideas!</h1>
        </div>
      </div>

    <div className={s.buttonContainer}>
    <Link to= '/recipes'>
    <button className={s.button}>Enter</button>
    </Link>
    </div>
    </div>
  )
}
