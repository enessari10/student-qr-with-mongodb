'use strict';
require('dotenv').config({ path: '.env' });

const express = require("express");
var mongoose = require("mongoose");
const Lecture = require("../models/lectures.model").Lectures;
const router = express.Router();


router.get('/', async (req, res) => {

    res.status(200).json("Hello, welcome Lectures");
    
});


router.post('/create', async (req, res) => {

    try {
      const { student_id, student_name, student_surname, teacher_id, teacher_name, teacher_surname,lecture_name, lecture_subject, lecture_desc, lecture_time, studentDidCome} = req.body;
      const newLecture = new Lecture({student_id, student_name, student_surname, teacher_id, teacher_name, teacher_surname,lecture_name,lecture_subject,lecture_desc,lecture_time,studentDidCome });
      await newLecture.save();
      res.status(200).json({ message: 'Ders kaydı oluşturuldu.', newLecture: newLecture });
    } catch (error) {
      res.status(500).json({ message: 'Ders kaydı oluşturuldu. oluşturulurken bir hata oluştu.', error: error.message });
    }

});
router.put('/check/:id', async (req, res) => {
    
    try {
      const { studentDidCome } = req.body;
      const lectureId = req.params.id;
      const lecture = await Lecture.findById(lectureId);
  
      if (!lecture) {
        return res.status(404).json({ message: 'Ders bulunamadı.' });
      }
  
      lecture.studentDidCome = studentDidCome;
      await lecture.save();
  
      res.status(200).json({ message: 'Yoklama güncellendi.', lecture: lecture });
    } catch (error) {
      res.status(500).json({ message: 'Yoklama güncellenirken bir hata oluştu.', error: error.message });
    }
  });
  
module.exports = router;
