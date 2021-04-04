const Question = require('../models/Question');
const Answer = require('../models/Answer');
const validaRut = require('../helpers/valida_rut');


const getQuestions = async (req,res) => {
    const questionsData = await Question.find();
    const questions = questionsData.map(question => {return {
        question_id: question._id, 
        question: question.question, 
        answers: question.answers,
        // correctAnswer: question.correctAnswer
    }});

    console.log(questions)
    res.status(200).json({
        questions,
        totalQuestions: questions.length
    })
}

const postQuestions = async(req,res) => {
    const {answers, user, rut} = req.body;
    console.log('answers: ', answers);
    console.log('user: ', user)

    let correctAnswers = 0;

    //TODO: hacer la funcion validaRut
    if (!user || !validaRut(rut) || answers.length < 1){
        return res.status(400).json({
            error: 'Ingresar información valida'
        })
    }

    for (let postedAnswer of answers){
        const {questionId, answer} = postedAnswer;

        const question = await Question.findById(questionId);

        if (answer === question.correctAnswer){
            correctAnswers++;
        }
    }
    //TODO: agregar % acierto
    const answeredQuestions = new Answer({
        username: user, 
        rut,
        answers,
        correctAnswers
    })
    let savedAnswers;
    try{
        savedAnswers = await answeredQuestions.save();

    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: err,
            
        })
    }

    res.status(200).json({
        msj: 'Datos ingresados correctamente',
        data: savedAnswers
    })
}

const setQuestion = async (req,res) => {
    console.log(req.body)
    const {question, answers, correctAnswer, category} = req.body;
    if(typeof question != 'string' || question.length < 1){
        return res.status(400).json({
            error: "Ingresar pregunta"
        });
    }
    if(typeof answers != 'object' || answers.length < 2){
        return res.status(400).json({
            error: "Ingresar opciones de respuesta"
        });
    }
    if(isNaN(correctAnswer)){
        return res.status(400).json({
            error: "Ingresar opciones de respuesta"
        });
    }
    if(typeof category != 'string' || category.length < 1){
        return res.status(400).json({
            error: "Ingresar categoria"
        });
    }
    const newQuestion = new Question({
        question,
        answers,
        correctAnswer,
        category
    })

    const savedQuestion = await newQuestion.save();

    res.status(200).json({
        msj: 'Datos ingresados correctamente',
        question: savedQuestion
    })
}

//TODO: Agregar ruta que devuelva el top10 del ranking de respuestas



module.exports = {
    getQuestions,
    postQuestions,
    setQuestion
}