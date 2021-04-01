const {Schema, model} = require('mongoose');

const AnswersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    answers: 
        [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Questions',
                    required: true
                },
                answer: {
                    type: Number,
                    required: true
                }
            }
        ],

    correctAnswers: {
        type: Number
    }
});

module.exports = model('Answers', AnswersSchema);