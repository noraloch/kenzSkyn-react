import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function Quiz({ currentUser, setCurrentUser, setProductsState }) {

    const history = useHistory();
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
        console.log(userAnswersObj)
        if (currentUser) {
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userAnswersObj),
            })
            .then(r=>r.json())
            .then((obj) => handleShowResult(obj))
        };
    };


    function handleShowResult(user) {
        setCurrentUser(user);
        console.log(user);
        if (currentUser) {
            fetch('http://localhost:3000/products')
                .then(r => r.json())
                .then((products) => {
                    let userProducts = products.filter(p => 
                        ((user.acne && p.skin_attribute === 'acne') ||
                        (user.oily_skin && p.skin_attribute === 'oily_skin') ||
                        (user.dry_skin && p.skin_attribute === 'dry_skin') || 
                        (user.combination_skin && p.skin_attribute === 'combination_skin')
                    ));
                    console.log("check", userProducts);
                    setProductsState(userProducts);
                    history.push(`/recommendation`);
                    // if (currentUser.acne) {
                    //     let acneProducts = products.filter(product => product.skin_attribute === "acne");
                    //     setProductsState(acneProducts);
                    //     console.log("acne products", acneProducts);
                    // };
                    // if (currentUser.oily_skin) {
                    //     let oilySkinProducts = products.filter(product => product.skin_attribute === "oily_skin");
                    //     setProductsState(oilySkinProducts);
                    //     console.log("oily products", oilySkinProducts);
                    // };
                    // if (currentUser.dry_skin) {
                    //     let drySkinProducts = products.filter(product => product.skin_attribute === "dry_skin");
                    //     setProductsState(drySkinProducts);
                    //     console.log("dry products", drySkinProducts)
                    // };
                    // if (currentUser.combination_skin) {
                    //     let combiSkinProducts = products.filter(product => product.skin_attribute === "combination_skin");
                    //     setProductsState(combiSkinProducts);
                    //     console.log("oily products", combiSkinProducts)
                    // };
                });
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
