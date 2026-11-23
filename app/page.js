
"use client";

import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { ref, push, set, get } from "firebase/database";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved questions
  async function fetchQuestions() {
    try {
      const dbRef = ref(db, "questions");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));

        setQuestions(list);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to fetch questions");
    }
  }

  // Load questions when page opens
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Save question
  async function saveQuestion(e) {
    e.preventDefault();
    setLoading(true);

    const questionData = {
      question: question,
      options: {
        A: optionA,
        B: optionB,
        C: optionC,
        D: optionD
      },
      correctAnswer: correctAnswer
    };

    try {
      const newQuestionRef = push(ref(db, "questions"));

      await set(newQuestionRef, questionData);

      alert("Question saved successfully!");

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("A");

      await fetchQuestions();

    } catch (error) {
      console.error(error);
      alert("Error saving question: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h1>Quiz Creator</h1>

      <form onSubmit={saveQuestion}>

        <label>Question</label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          required
          style={inputStyle}
        />

        <label>Option A</label>
        <input
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          placeholder="Enter option A"
          required
          style={inputStyle}
        />

        <label>Option B</label>
        <input
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          placeholder="Enter option B"
          required
          style={inputStyle}
        />

        <label>Option C</label>
        <input
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
          placeholder="Enter option C"
          required
          style={inputStyle}
        />

        <label>Option D</label>
        <input
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
          placeholder="Enter option D"
          required
          style={inputStyle}
        />

        <label>Correct Answer</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          style={inputStyle}
        >
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            width: "100%",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            marginTop: "15px",
            cursor: "pointer"
          }}
        >
          {loading ? "Saving..." : "Save Question"}
        </button>

      </form>

      <hr style={{ margin: "30px 0" }} />

      <h2>Saved Questions</h2>

      {questions.length === 0 ? (
        <p>No questions saved yet.</p>
      ) : (
        questions.map((item) => (
          <div key={item.id} style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "15px"
          }}>

            <h3>{item.question}</h3>

            <p>A. {item.options.A}</p>
            <p>B. {item.options.B}</p>
            <p>C. {item.options.C}</p>
            <p>D. {item.options.D}</p>

            <strong>
              Correct Answer: Option {item.correctAnswer}
            </strong>

          </div>
        ))
      )}

    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  marginBottom: "18px",
  boxSizing: "border-box"
};
