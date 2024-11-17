"use client"
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <CountUp end={amount} duration={1.5}  decimals={2} 
    prefix="$"/>
  )
}

export default AnimatedCounter
