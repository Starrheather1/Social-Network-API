const User  = require('../models/User.js');

module.exports = {
  async getUsers(req, res) {
    try {
      console.log(User)
      const users  = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    const userId=req.params.userId

    try{
      let user = await User.findById(userId);
       res.json(user)


    }catch(err){
      return res.status(500).json(err)
    }


  },
  async createUser(req, res) {
    try {
      
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    const userId=req.params.userId

    try{
      
      const update = req.body;
      
      // `doc` is the document _before_ `update` was applied
      let doc = await User.findByIdAndUpdate(userId, update);
       res.json(doc)


    }catch(err){
      return res.status(500).json(err)
    }

  },
  async deleteUser(req, res) {

    const userId=req.params.userId

    try{
      let user = await User.findByIdAndDelete(userId);
       res.json(user)


    }catch(err){
      return res.status(500).json(err)
    }


  },
  async addFriend(req, res) {
    const userId=req.params.userId
    const friendId=req.params.friendId

    try{
     let result=await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      )

      await User.findByIdAndUpdate(
        friendId,
        { $addToSet: { friends: userId} },
        { new: true }
      )


      return res.json(result)
    }catch(err){
      return res.json(err)
    }

  },
  async deleteFriend(req, res) {
    const {userId,friendId}=req.params
   
     
    removeUserFriend(userId,friendId).then(result=>{
      if(result){
        return removeUserFriend(friendId,userId)
      }else{
         return false
      }
    }).then(result=>{
      if(result){
        return res.send("friend remove successfully")
      }
      return res.send("Can not find friend")
    })
    .catch((error) => {
      
    return res.json(error)
    });
    },


  //add thought ,remove thought
};


function removeUserFriend(userId,friendId){
  return User.findById(userId)
  .populate('friends') // Populate the 'friends' field
  .exec()
  .then((document) => {
   
    if (!document) {
      console.log('Document not found');
      return false;
    }

    // Find the index of the friend to remove in the populated 'friends' array
    const friendIndex = document.friends.findIndex((friend) => friend._id.toString() === friendId);
     
    if (friendIndex !== -1) {
      // Remove the friend from the array
      document.friends.splice(friendIndex, 1);
      
      // Save the updated document
      return document.save();
    
    } else {
      
      return false;
    }
  })
  .then((updatedDocument) => {
    
    if (updatedDocument) {
     return true
    }else{
      
      return false
    }

}).catch(err=>{
  throw new Error("Error:"+err.message);
})
}