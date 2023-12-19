const User = require('../models/user');

exports.follow = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('succes');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// exports.unFollowing = async(req, res, next) => {
//     try{
//         const user = await User.findOne({where: {id: req.user.id}});
//         if(user){
//             await user.removeFollowing(parseInt(req.params.id, 10));
//             res.send('success');
//         }else{
//             res.status(404).send('no user');
//         }
//     }catch(error){
//         console.error(error)
//         next(error);
//     }
// }

exports.updateProfile = async (req, res, next) => {
    try {
      const { nickname } = req.body;
      const user = await User.findOne({ where: { id: req.user.id } });
  
      if (user) {
        // Update the nickname of the user
        user.nick = nickname;
        await user.save();
  
        res.redirect('/');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };