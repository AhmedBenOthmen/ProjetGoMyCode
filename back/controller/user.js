const User = require('../models/user.js')

exports.getOneUser = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id , isActive:true})
        let data
        if (user) {
            data = user
        }else {
            data = "No user found"
        }
    
        return res.status(200).json({
            payload:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error IN getOneUser"
        })
    }
    }

    exports.getAllUsers = async (req, res) => {
        try {
            let query = { isActive: true };
    
            if (req.query.username) {
                const userNameRegex = new RegExp(req.query.username, 'i');
                query.username = userNameRegex;
            }
    
            const users = await User.find(query);
    
            let data = (users && users.length) ? users : "No users found";
    
            return res.status(200).json({
                payload: data
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error in getAllUsers"
            });
        }
    };


    exports.updateUser = async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    
            let data;
            if (user) {
                data = user;
                await User.updateOne({ _id: req.params.id }, { $set: { updatedAt: Date.now() } });
            } else {
                data = "No Data Found";
            }
    
            return res.status(200).json({
                payload: data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error in Updating User",
            });
        }
    };

    exports.deleteUser = async (req,res)=>{
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, { isActive: false })
            let data
            if (user) {
                data = "User  Deleted"
            } else {
                data = "No User Found"
            }
    
            return res.status(200).json({
                payload: data
            })
    
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:"Error in deleting User"
            })
        }
    }