const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

module.exports = {
  getEventById(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { eventId } = req.params;
        try {
          const events = await Event.findById(eventId);
          if (events) {
            return res.json({ authData: authData, events: events });//the same as res.json({authData, events})
          }
        } catch (error) {
          return res.status(400).json({ message: "Event ID does not exist" });
        }
      }
    });
  },
  
  getAllEvents(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.statusCode(401);
      } else {
        const { sport } = req.params;
        const query = sport ? { sport } : {};
        try {
          const events = await Event.find(query); //it will return all the events as an object
          if (events) {
            return res.json({ authData, events });
          }
        } catch (error) {
          return res
            .status(400)
            .json({ message: "we don't have any event yet" });
        }
      }
    });
  },

  getEventsByUserId(req, res) {
    jwt.verify(req.token, 'secret', async (err, authData) => {
      if (err) {
        res.statusCode(401);
      }else {
        const { user_id } = req.headers;
        try {
          const events = await Event.find({ user: authData.user._id }); //it will return all the events as an object
          if (events) {
            return res.json({authData, events});
          }
        } catch (error) {
          return res
            .status(400)
            .json({
              message: `we don't have any event with the user_id${user_id}`,
            });
        }
      }
    })
  },
};
