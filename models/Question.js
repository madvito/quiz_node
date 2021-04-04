const {Schema, model} = require('mongoose');

const QuestionsSchema = Schema({
    question: {
        type: String,
        required: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    }
});

module.exports = model('Questions', QuestionsSchema);