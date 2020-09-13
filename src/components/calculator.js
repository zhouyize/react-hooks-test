import React,{ useContext, useState } from 'react';
//import ReactDom from "react-dom";

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
function toFahrenheit(celsius) {
return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

const CalContext = React.createContext({});


const BoilingVerdict = (props) => {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
  }

const TemperatureInput = () => {
    const { temperature,scale,onTemperatureChange } = useContext(CalContext);
    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature} onChange={()=>onTemperatureChange(temperature)}></input>
        </fieldset>  
    )
}

const Calculator = () => {
    const [scale,setScale]= useState("c");
    const [temperature,setTemperature]= useState(0);
    function handleCelsiusChange (temperature) {
        setScale('c')
        return setTemperature(temperature)
    }
    function handleFahrenheitChange (temperature) {
        setScale('f')
        return setTemperature(temperature)
    }
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <CalContext.Provider value={celsius,fahrenheit}>
            <TemperatureInput onTemperatureChange={handleCelsiusChange}/>
            <TemperatureInput onTemperatureChange={handleFahrenheitChange}/> 
            <BoilingVerdict celsius={parseFloat(celsius)} />   
        </CalContext.Provider>
    )
}

export default Calculator;