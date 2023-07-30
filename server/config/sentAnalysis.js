import * as tf from '@tensorflow/tfjs';
import {loadLayersModel} from '@tensorflow/tfjs';
// Load the pre-trained model
const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');

// Define a function to preprocess the text input
function preprocess(text) {
  return text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
}

// Define a function to perform sentiment analysis on the input text
function predictSentiment(text) {
  // Preprocess the input text
  const inputText = preprocess(text);
  
  // Convert the preprocessed text to a tensor
  const inputTensor = tf.tensor2d(inputText, [1, inputText.length]);
  
  // Make a prediction with the pre-trained model
  const prediction = model.predict(inputTensor);
  
  // Get the predicted sentiment as a number
  const sentimentScore = prediction.dataSync()[0];
  
  // Return the sentiment score (positive or negative)
  return sentimentScore > 0 ? 'positive' : 'negative';
}

// Test the function with an example sentence
const sentence = 'This movie was great!';
console.log(predictSentiment(sentence)); // Output: 'positive'
