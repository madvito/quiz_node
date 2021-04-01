const Questions = require('../models/Questions');
const Answers = require('../models/Answers');
const validaRut = require('../helpers/valida_rut');

const data = [
    {
        question:[]
    }
]

const getQuestions = async (req,res) => {
    const questionsData = await Questions.find();
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

    if (!user || !validaRut(rut) || answers.length < 1){
        return res.status(400).json({
            error: 'Ingresar información valida'
        })
    }

    // answers.map(postedAnswer=>{
    //     const {questionId, answer} = postedAnswer;

    //     const question = await Questions.findById(questionId);

    // });

    for (let postedAnswer of answers){
        const {questionId, answer} = postedAnswer;

        const question = await Questions.findById(questionId);

        if (answer === question.correctAnswer){
            correctAnswers++;
        }
    }
    //TODO: agregar % acierto
    const answeredQuestions = new Answers({
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
    const {question, answers, correctAnswer} = req.body;
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
    const newQuestion = new Questions({
        question,
        answers,
        correctAnswer
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