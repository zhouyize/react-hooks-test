import React,{ useContext, useState, useCallback } from 'react';
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

const TemperatureInput = (props) => {
    const { scale } = useContext(CalContext);
    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={props.temperature} onChange={props.onTemperatureChange}></input>
        </fieldset>  
    )
}

const Calculator = () => {
    const [scale,setScale]= useState("c");
    const [temperature,setTemperature]= useState(0);
    //const onCelsiusChange = useCallback( (e)=>handleCelsiusChange(e),[] )
    //const onFahrenheitChange = useCallback( (e)=>handleFahrenheitChange(e),[] )
    function handleCelsiusChange (e) {
        //debugger
        setScale('c')
        return setTemperature(e.target.value)
    }
    function handleFahrenheitChange (e) {
        setScale('f')
        return setTemperature(e.target.value)
    }
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <CalContext.Provider value={ scale,temperature,celsius,fahrenheit}>
            <TemperatureInput temperature={celsius}
           onTemperatureChange={handleCelsiusChange}/>
            <TemperatureInput temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange}/> 
            <BoilingVerdict celsius={parseFloat(celsius)} />   
        </CalContext.Provider>
    )
}

export default Calculator;