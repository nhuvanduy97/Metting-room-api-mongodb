const Room = require("../model/roomModel")

module.exports = {
    getAllRoom: function (req, res) {
        Room.find().populate('manager').exec((err, rooms) => {
            if (err) throw err;
            res.json({
                success: true,
                rooms: rooms
            })
        })
    },
    addRoom: function (req, res) {
        let newRoom = new Room({
            name: req.body.name,
            seatnumber: req.body.seatnumber,
            position: req.body.position,
            des: req.body.des,
            manager: req.body.manager
        })
        newRoom.save(function (err, result) {
            if (result) {
                res.json({
                    success: "ok"
                })
            }
        })
    }
}