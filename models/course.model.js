const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    Course_Name: {
        type: String,
        required: 'This field is required.'
    },
    Course_id: {
        type: String
    },
    Course_Duration: {
        type: String
    },
    Course_Fee: {
        type: String
    }
});

// Custom validation for email
//courseSchema.path('Course_id').validate((val) => {
   // emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   // return emailRegex.test(val);
//}, 'Invalid .');

mongoose.model('Course', courseSchema);