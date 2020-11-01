const express = require('express');
const multer = require('multer');
const EventController = require('./controllers/EventController');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const DashboardController = require('./controllers/DashboardController');
// const uploadConfig = require('./config/upload');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectController = require('./controllers/RejectController');
// const upload = multer(uploadConfig);
const uploadToS3 = require('./config/s3Upload');

const verifyToken = require('./config/verifyToken');
//https://www.youtube.com/watch?v=STbqBxgKD2I&list=PLqrQf0z-Hg7jD3ASYy9febJhQoUbzC8kb&index=4

routes.get('/status', (req, res) => {
  res.send({status: 200})
})

//TODO Registration ApprovedController
routes.post('/registration/:registration_id/approvals', verifyToken, ApprovalController.approval)
//TODO Registration RejectController
routes.post('/registration/:registration_id/rejections', verifyToken, RejectController.rejections)
//TODO RegistrationController
//TODO to get Registration by ID RegistrationController
routes.post('/registration/:eventId', verifyToken, RegistrationController.create)
routes.get('/registration', verifyToken, RegistrationController.getMyRegistration)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)

//TODO LoginController
routes.post('/login', LoginController.store)

//dashboard routers
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById)

//Event routers
routes.post('/event', verifyToken, uploadToS3.single("thumbnail"), EventController.createEvent)
// routes.post('/event', verifyToken, upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId', verifyToken, EventController.deleteEvent)

//User routers
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes;