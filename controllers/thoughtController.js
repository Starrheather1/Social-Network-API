const  Thought  = require('../models/Thought')
const Reaction = require('../models/Reaction');

module.exports = {
  async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }

  },
  async getSingleThought(req, res) {
    let thoughtId=req.params.thoughtId
    try {
        const thought = await Thought.findById(thoughtId);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }

  },
  async createThought(req, res) {
    try {
        
        const thoughts = await Thought.create(req.body);
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }

  },
  async updateThought(req, res) {
    const thoughtId=req.params.thoughtId
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId,req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }

  },
  async deleteThought(req, res) {
    const thoughtId=req.params.thoughtId
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }

  },
  async addReaction(req, res) {

    try {
        const thoughtId=req.params.thoughtId
        const newReaction = new Reaction(req.body);

          const thought = await Thought.findById(thoughtId);

          if (!thought) {
            return res.send("Can not find thought with this id")
          }
      
          // Push the newReaction object into the reactions array of the thought
          thought.reactions.push(newReaction);
      
          // Save the updated thought using await
          const updatedThought = await thought.save();
          res.json(updatedThought)
      
      } catch (err) {
        res.status(500).json(err);
      }

  },
  async deleteReaction(req, res) {

    try {
        const thoughtId=req.params.thoughtId
        const reactionId=req.params.reactionId
         console.log("delete")

          const thought = await Thought.findById(thoughtId);

          if (!thought) {
            return res.send("Can not find thought with this id")
          }
      
          // Push the newReaction object into the reactions array of the thought
          console.log(thought.reactions)
          thought.reactions= thought.reactions.filter(item => item.reactionId._id.toString() !== reactionId);
      
          // Save the updated thought using await
          const updatedThought = await thought.save();
          res.json(updatedThought)
      } catch (err) {
        res.status(500).json(err);
      }
  }
};
