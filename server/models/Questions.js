import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    questionTitle: { type: String, required: "Question must've a title" },
    questionBody: { type: String, required: "Question must've a Body" },
    questionTags: { type: [String], required: "Question must've a tags" },
    noOfAnswers: { type: Number, default:0 },
    upVote: { type: [String] ,default:[]},
    downVote: { type: [String] ,default:[]},
    userPosted: { type: String, required: "Question must've an author" },
    userId: { type: String },
    askedOn: { type: Date, default: Date.now },
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        asnweredOn: { type: Date, default: Date.now },
        replies: [{userId: String, userAnswered: String, reply:String}]
    }]

})

export default mongoose.model('Question', QuestionSchema)