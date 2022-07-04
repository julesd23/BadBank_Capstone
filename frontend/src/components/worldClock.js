import React, { useState, useEffect } from 'react'

function WorldClock() {

    const [newYorkState, setNewYorkState] = useState()
    const [london, setLondon] = useState()
    const [rome, setRome] = useState()
    const [bangkok, setBangkok] = useState()
    const [taiwan, setTaiwan] = useState()
    const [sydney, setSydney] = useState()

    useEffect(() => {
        setInterval(() => {
            const nyc = new Date();
            setNewYorkState(nyc.toLocaleTimeString())
        }, 1000)
    })

    useEffect(() => {
        setInterval(() => {
            const londonTime = new Date()
            londonTime.setHours(londonTime.getHours() + 5)
            setLondon(londonTime.toLocaleTimeString())
        }, 1000)
    })

    useEffect(() => {
        setInterval(() => {
            const romeTime = new Date()
            romeTime.setHours(romeTime.getHours() + 6)
            setRome(romeTime.toLocaleTimeString())
        }, 1000)
    })

    useEffect(() => {
        setInterval(() => {
            const bangkokTime = new Date()
            bangkokTime.setHours(bangkokTime.getHours() + 11)
            setBangkok(bangkokTime.toLocaleTimeString())
        }, 1000)
    })

    useEffect(() => {
        setInterval(() => {
            const taiwanTime = new Date()
            taiwanTime.setHours(taiwanTime.getHours() + 12)
            setTaiwan(taiwanTime.toLocaleTimeString())
        }, 1000)
    })

    useEffect(() => {
        setInterval(() => {
            const sydneyTime = new Date()
            sydneyTime.setHours(sydneyTime.getHours() + 14)
            setSydney(sydneyTime.toLocaleTimeString())
        }, 1000)
    })

    return (
        <div className="ticker-wrap">
            <div className="ticker">
                <div className="ticker-item">New York: <span>{newYorkState}</span></div>
                <div className="ticker-item">London: <span>{london}</span></div>
                <div className="ticker-item">Rome: <span>{rome}</span></div>
                <div className="ticker-item">Bangkok: <span>{bangkok}</span></div>
                <div className="ticker-item">Taiwan: <span>{taiwan}</span></div>
                <div className="ticker-item">Sydney: <span>{sydney}</span></div>
            </div>
        </div>
    )
}

export default WorldClock
