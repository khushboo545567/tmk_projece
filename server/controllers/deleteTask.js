const db = require("../mysqlconnect.js");
require("../middleware/verifyUser.js");

const deleteTask = (req,res)=>{
    const taskId = req.params.id;
    const sql = 'DELETE  FROM task WHERE id=?';
    db.query(sql,[taskId],(err,result)=>{
        if(err){
            console.error("database error :" ,err)
            return res.status(500).json({error:"failed to delete task"})
        };
        res.status(200).json({message:"task deleted sussfully"});
    })

}

module.exports = deleteTask;