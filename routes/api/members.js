const { request } = require("express");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../members");

//gets all members
router.get("/", (req, res) => {
  res.json(members);
});

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ message: `member ${req.params.id} not found` });
  }
});

//create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };
  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "please include a name or email" });
  }
  members.push(newMember);
  res.json(members);
});

//update members
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.map((member) => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updateMember.name ? updateMember : member.name),
        (member.email = updateMember.email ? updateMember : member.email)

        return res.json({msg: 'Member updated', member})
      }
    });
  } else {
    res.status(400).json({ message: `member ${req.params.id} not found` });
  }
});

//delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({msg: 'member deleted', members: members.filter((member) => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ message: `member ${req.params.id} not found` });
  }
});

module.exports = router;
