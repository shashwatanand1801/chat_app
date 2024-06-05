const Messages = require("../models/messageModel");
const User = require("../models/userModel")
const getLLMResponse = require("../utils/llmMock")
const llmResponse = require('../utils/llmTest')
const fetchWithTimeout = require("../utils/test")

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, to_username, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // console.log(data)

    const doc = await User.findOne({username: to_username}, 'status');

    if(doc.status === 'BUSY') {
        llmRes = ""
        await llmResponse(message)
                    .then((response) => {
                      llmRes = response});

        console.log(llmRes)
          
        // console.log("Heeeelooooo")
        const llmData = await Messages.create({
          message: { text: llmRes },
          users: [to, from],
          sender: to,
        });

        // console.log(llmData)
    }
    

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
