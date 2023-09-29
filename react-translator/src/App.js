import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react';

import  axios from 'axios';
function App() {
  const[options,setOptions]=useState([]);
  const [to,setTo]=useState("en");
  const[from,setFrom]=useState("en");
  const [input,setInput]=useState("");
  const [output,setOutput]=useState("");

  const translate=()=>{
    // curl -X 'POST' \
    // 'https://libretranslate.com/translate' \
    // -H 'accept: application/json' \
    // -H 'Content-Type: application/x-www-form-urlencoded' \
    // -d 'q=hello&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

  const params = new URLSearchParams();// using this params since api is not taking JSON and taking url encoded
params.append('q', input);
params.append('source', from);
params.append('target', to);
params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
axios.post('https://libretranslate.de/translate'// use .de not .com --> since .com will not give you access
,params,
{headers:
{'accept': 'application/json',
'Content-Type': 'application/x-www-form-urlencoded',},
}).then(res=>{
  // console.log(res.data);
  setOutput(res.data.translatedText)
})
  }
  
  

  useEffect(()=>{
    // curl -X 'GET' \
  // 'https://libretranslate.com/languages' \
  // -H 'accept: application/json'
    axios.get('https://libretranslate.de/languages',{headers:{'accept':'application/json'}}).then(res=>{console.log(res.data);
    setOptions(res.data);

})  
},[])

 /* create a button to swap the places to convert output language to input language */
  return (
    <div className="App">
    <div>
      From:({from})
      <select onChange={e=>setFrom(e.target.value)}>
       {options.map(e=> <option key={e.code} value={e.code}>{e.name}</option>)}
      </select>
      To:({to})
      <select onChange={e=>setTo(e.target.value)}>
       {options.map(e=> <option key= {e.code} value={e.code}>{e.name}</option>)}
      </select>
    </div>
        <textarea cols="50" rows="8" onInput={(e)=>setInput(e.target.value)}></textarea>

    <div>
    </div>
        <textarea cols="50" rows="8" value={output}></textarea>
        
    <div>
    </div>
       <button onClick={e=>translate()}>Translate</button>
       
    <div>

    </div>
    </div>
  );
}

export default App;
