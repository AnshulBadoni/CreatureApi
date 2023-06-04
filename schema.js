const mongoose = require('mongoose');

const relationSchema = {
    Pid: {type:String,required: true,unique:true},
    Pfname: {type:String,required:true},
    Plname: {type:String,required:true},
    Pdesc:{type: String},
    Pimg:
    {
        data: Buffer,
        contentType: String
    },
    Pdob:{type:Date},
    Pfather:{type:String},
    Pmother:{type:String}
};
module.exports = Relation = mongoose.model("Family ",relationSchema);