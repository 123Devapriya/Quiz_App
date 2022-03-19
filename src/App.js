import React, { useState, useEffect } from "react";
import "./App.css"
import axios from 'axios';
import Timer from "./Timer";

const App = (props) => {
  const [responseArray, setresponseArray] = useState([]);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [watchAns, setWatchAns] = useState(false);
  useEffect(() => {
    fetchResults();
  }, [])
  const fetchResults = async () => {
    // console.log(responseArray.length)
    await axios.get('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple')
      .then(function (response) {
        // console.log(response.data.results);
        setresponseArray(response.data.results);
        console.log(responseArray);
      })
     
  }
  let c = 0;
  const count = () => {
    c++;
  }
  const handleSubmit = () => {
    setScore(c);
    alert("Successfully Submitted")
    setResult(true);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  }
  
  const showAns = () => {
    setWatchAns(true);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  }
  return (
    <>
      <Timer response={`${responseArray.length}`} status={`${result}`}/>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', color: 'hotpink', fontWeight: 'bold', paddingBottom: '2rem' }}>Quiz app by Priya</h1>
      {responseArray.map(function (ques, i) {
        return (
          <div key={i}>
            {/* <h1 className="bold center"> {i + 1} </h1> */}
            <h1 style={{ textAlign: "center", fontSize: '2rem', padding: '1rem', marginBottom: '2rem', backgroundColor: '#7b28e0', width: '90%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '2rem' }}>Q{i + 1} {responseArray[i].question}</h1>
            <div>
              <div className="grid-container">
                <span>
                  A.<input name={`q${i+1}`} type="radio" value="1" onClick={count} />
                  {responseArray[i].correct_answer}
                </span>
                <span>
                  B. <input name={`q${i+1}`} type="radio" value="2" />
                  {responseArray[i].incorrect_answers[0]}
                </span>
                {/* <br /> */}
                <span>
                  C. <input name={`q${i+1}`} type="radio" value="3" />
                  {responseArray[i].incorrect_answers[1]}
                </span>
                <span>

                  D. <input name={`q${i+1}`} type="radio" value="4" />
                  {responseArray[i].incorrect_answers[2]}
                </span>
              </div>
              <hr />
            </div>
          </div>
        )
      })}
      <button onClick={handleSubmit}>Submit</button>
      {result ?
        <div className="results">
          <figure>
            <img width="400px" src="https://images.unsplash.com/photo-1603899122361-e99b4f6fecf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Your Score is {score}!</h2>

            <div>
              <button onClick={showAns} className="btn btn-primary">Check Answers</button>
            </div>
          </div>
        </div> : null
      }
      {
        watchAns ?
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ color: 'hotpink', textAlign: 'center', padding: '2rem' }}>Questions along with Answers</h2>
            {responseArray.map(function (ques, i) {
              return (

                <div style={{ textAlign: 'center' }} key={i}>

                  <div>
                    <h1 style={{ textAlign: "center", fontSize: '1rem' }}>Q {i + 1} {responseArray[i].question}</h1>
                    <div>
                      <span style={{ paddingBottom: '1rem' }}>Answer {i + 1} : {responseArray[i].correct_answer}</span><br />
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
              )
            })}
          </div> : null
      }
    </>
  );
};

export default App;