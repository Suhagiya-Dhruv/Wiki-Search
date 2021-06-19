import React,{useState} from "react";
import "./App.css";

const App = () => {
  
  const [apiLinks, setApiLinks] = useState([]);
  const [apiLinksTest, setApiLinksTest] = useState([]);

  function api(a){
    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=${a}`)
    .then(data => data.json())
    .then(res => {
      setApiLinks(res[3]);
      setApiLinksTest(res[1]);
    })
  }

  var timer ;
  const debouncing = (e) => {
    clearTimeout(timer);
    timer = setTimeout(()=>{
      api(e.target.value)
    },400)
  }
  return (
    <div className="container">
      <h1 >Wiki Search</h1>
      <input type="text" onChange={debouncing} className="input"/><br/>
      <div className="keyword">
      {
        apiLinks && apiLinksTest ? apiLinksTest.map((item,index) => {
          return<div key={index} className="word">
           <a href={apiLinks[index]} target="_blank">{item}</a>
          </div>
        })
        :
        <span></span>
      }
      </div>
    </div>
  );
};

export default App;

