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
    },
    updateRoom: function (req, res) {
        Room.findByIdAndUpdate(req.body._id,{
            $set: {
                name: req.body.name,
                seatnumber: req.body.seatnumber,
                position: req.body.position,
                des: req.body.des,
            },
        }, {upsert: true}, function(err, result) {
            if (err) throw err;
            if (result){
                return  res.json({
                    message: true
                })
            }
        })
    },
    remoteRoom: function (req, res) {
        Room.findByIdAndDelete({_id: req.query._id}, function (err, result){
            if (err) throw err;
            return res.json({
                message: true
            })
        })
    }
}