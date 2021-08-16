import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function Quiz({ currentUser, handleShowResult, setCurrentUser }) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswersObj, setUserAnswersObj] = useState({});

    const question1 = 'Which of the following is your age group?';
    const question2 = 'What type is your skin?';
    const question3 = 'Do you suffer from acne?';
    const question4 = 'Do you workout?';

    const questions = [
        {
            questionText: question1,
            answerOptions: [
                { answerText: "less than 20" },
                { answerText: "20s" },
                { answerText: "30s" },
                { answerText: "40s" },
                { answerText: "50s" },
                { answerText: "more than 60" }
            ],
        },
        {
            questionText: question2,
            answerOptions: [
                { answerText: 'Dry Skin' },
                { answerText: 'Oily Skin' },
                { answerText: 'Combination Skin' }
                // { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: question3,
            answerOptions: [
                { answerText: 'Yes, I have acne' },
                { answerText: 'No' }
            ],
        },
        {
            questionText: question4,
            answerOptions: [
                { answerText: 'I do' },
                { answerText: 'Not really' }
            ],
        },
        {
            questionText: "Thank you for doing the quiz!",
            answerOptions: [
                { answerText: 'View result' },
            ],
        }
    ];
    // "oily_skin":null,"dry_skin":null,"combination_skin":null,"acne":null

    // {oily_skin: answer,dry_skin:answer,combination_skin:answer,acne:answer};

    const handleAnswerOptionClick = (answer) => {
        // Reduce the question answers to the user attributes table
        if (currentUser) {
            switch (questions[currentQuestion].questionText) {
                case question1: {
                    // TODO - change DB to str
                    setUserAnswersObj({ ...userAnswersObj, age: answer.answerText });
                    break;
                }
                case question2: {
                    setUserAnswersObj({ ...userAnswersObj, oily_skin: answer.answerText === 'Oily Skin', dry_skin: answer.answerText === 'Dry Skin', combination_skin: answer.answerText === 'Combination Skin' });
                    break;
                }
                case question3: {
                    setUserAnswersObj({ ...userAnswersObj, acne: answer.answerText === 'Yes, I have acne' });
                    break;
                }
                case question4: {
                    setUserAnswersObj({ ...userAnswersObj, sport_practice: answer.answerText === 'I do' });
                    break;
                }
            }

            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion)
            } else {
                console.log(userAnswersObj)
                patchUserInfo();
            };
        };

    };
    // console.log(userAnswersObj)
    function patchUserInfo() {
        if (currentUser) {
            const token = localStorage.getItem("token");
            fetch(`${process.env.REACT_APP_RAILS_URL}/ba`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userAnswersObj),
            })
            .then(r=>r.json())
            .then((user) => handleShowResult(user))
        };
    };



    return (
        <>
            <div className='quiz'>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className='question-text'>{questions[currentQuestion].questionText}
                    </div>
                </div>
                <div className='answer-section'>
                    {questions[currentQuestion].answerOptions.map((answerOption) => (
                        <button className="answer-button" onClick={() => handleAnswerOptionClick(answerOption)}>
                            {answerOption.answerText}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Quiz;
