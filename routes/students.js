'use strict';
require('dotenv').config({ path: '.env' });

const express = require("express");
var mongoose = require("mongoose");
const Student = require("../models/student.model").Student;
const QRCode = require('qrcode');
const router = express.Router();
const Lecture = require("../models/lectures.model").Lectures;
const Parent = require("../models/parent.model").Parent;


router.get('/', async (req, res) => {

    res.status(200).json("Hello, welcome Students");

});

// router.post('/create', async (req, res) => {

//     try {
//       const { student_name, student_surname, student_email, student_password, student_phoneNumber } = req.body;
//       const newStudent = new Student({ student_name, student_surname, student_email, student_password, student_phoneNumber });
//       await newStudent.save();
//       res.status(200).json({ message: 'Öğrenci başarıyla oluşturuldu.', student: newStudent });
//     } catch (error) {
//       res.status(500).json({ message: 'Öğrenci oluşturulurken bir hata oluştu.', error: error.message });
//     }

// });

router.post('/create', async (req, res) => {
  try {
      const { 
          student_name, 
          student_surname, 
          student_email, 
          student_password, 
          student_phoneNumber,
          parents 
      } = req.body;

      const newStudent = new Student({ 
          student_name, 
          student_surname, 
          student_email, 
          student_password, 
          student_phoneNumber,
          parents
      });

      await newStudent.save();
      res.status(200).json({ message: 'Öğrenci başarıyla oluşturuldu.', student: newStudent });
  } catch (error) {
      res.status(500).json({ message: 'Öğrenci oluşturulurken bir hata oluştu.', error: error.message });
  }
});

router.post('/qr/:student_id', async (req, res) => {

    try {
      
      const student_id = req.params.student_id;
      const lecture = await Lecture.findOne({ student_id });
  
      if (!lecture) {
        return res.status(404).json({ message: 'Ders bulunamadı.' });
      }

      let stringdata = JSON.stringify(lecture._id)
      QRCode.toDataURL(stringdata, { type: 'image/png' }, function (err, url) {
        if (err) {
          return res.status(500).json({ message: 'QR kod oluşturulurken bir hata oluştu.', error: err.message });
        }
        res.status(200).json({ qrCodeBase64: url });
      });
    } catch (error) {
      res.status(500).json({ message: 'Kullanıcı bilgileri getirilirken bir hata oluştu.', error: error.message });
    }

  });

module.exports = router;


