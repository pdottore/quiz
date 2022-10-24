import { useEffect, useState, useMemo } from "react";
import "./app.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start"

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Now used to refer to a cat, the word tabby is derived from the name of a district of what world capital?", 
      answers: [
        {
          text:"Baghdad",
          correct: true,
        },
        {
          text: "New Delhi",
          correct: false,
        },
        {
          text: "Cairo",
          correct: false,
        },
        {
          text: "Moscow",
          correct: false,
        }
      ]
    },
    {
      id: 2,
      question: "Which insect shorted out an early supercomputer and inspired the term computer bug?", 
      answers: [
        {
          text:"Moth",
          correct: true,
        },
        {
          text: "Roach",
          correct: false,
        },
        {
          text: "Fly",
          correct: false,
        },
        {
          text: "Japanese beetle",
          correct: false,
        }
      ]
    },
    {
      id: 3,
      question: "Who did artist Grant Wood use as the model for the farmer in his classic painting American Gothic?", 
      answers: [
        {
          text:"Traveling salesman",
          correct: false,
        },
        {
          text: "Local sheriff",
          correct: false,
        },
        {
          text: "His dentist",
          correct: true,
        },
        {
          text: "His butcher",
          correct: false,
        }
      ]
    },
    {
      id: 4,
      question: "Which of the following men does not have a chemical element named after him?", 
      answers: [
        {
          text:"Albert Einstein",
          correct: false,
        },
        {
          text: "Niels Bohr",
          correct: false,
        },
        {
          text: "Issac Newton",
          correct: true,
        },
        {
          text: "Enrico Fermi",
          correct: false,
        }
      ]
    },
    {
      id: 5,
      question: "Which of the following landlocked countries is entirely contained within another country?", 
      answers: [
        {
          text:"Lesotho",
          correct: true,
        },
        {
          text: "Burkina Faso",
          correct: false,
        },
        {
          text: "Mongolia",
          correct: false,
        },
        {
          text: "Luxembourg",
          correct: false,
        }
      ]
    }
    ];

  const moneyPyramid = useMemo(() => 
    [
      { id:1, amount:"$ 100" },
      { id:2, amount:"$ 200" },
      { id:3, amount:"$ 300" },
      { id:4, amount:"$ 500" },
      { id:5, amount:"$ 1000" },
      { id:6, amount:"$ 2000" },
      { id:7, amount:"$ 4000" },
      { id:8, amount:"$ 8000" },
      { id:9, amount:"$ 16000" },
      { id:10, amount:"$ 32000" },
      { id:11, amount:"$ 64000" },
      { id:12, amount:"$ 125000" },
      { id:13, amount:"$ 250000" },
      { id:14, amount:"$ 500000" },
      { id:15, amount:"$ 1000000" },
    ].reverse(), []);

  useEffect(() => {
    questionNumber > 1 && 
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStop={setStop}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
