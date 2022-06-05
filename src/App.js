import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import countires from './countries.json';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

const App = () => {
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_FREE_NEWS_API
  const [progress, setProgress] = useState(0)
  const [country,setCountry] = useState('in');

  const supportedList = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za'];

  const countryOptions = ()=>{
    const options = [];
    Object.keys(countires).map( (k) => {
      if( supportedList.includes(k.toLowerCase())){
        options.push(  { value: k.toLowerCase(), label: countires[k] } );
      }
    });
    console.log(options)
    return options
  }



  return (
    <div>

      <HashRouter>
        <NavBar setCountry={setCountry}  country={country} countriesOptions={countryOptions()} />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="buness" pageSize={pageSize} country={country} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" />} />

        </Routes>
      </HashRouter>

    </div>
  )

}
export default App;

