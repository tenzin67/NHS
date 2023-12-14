import User from '../models/UserSchema.js'

export const updateUser = async (req, res) => {
     const userId = req.params.id;
     const { name, email, password } = req.body;
   
     try {
       const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
   
       if (!updatedUser) {
         return res.status(404).json({ success: false, message: 'User not found' });
       }
   
       res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
     } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: 'Failed to update user' });
     }
   };
   
export const deleteUser = async (req,res)=>{
     const id = req.params.id

     try {
           await User.findByIdAndDelete(id)
          res.status(200). json({success: true, message: 'Successfully to deleted'})
     } catch (error) {
          res.status(500). json({success: false, message: 'Fialed to delete'} )
     }

}
export const getSingleUser = async (req,res)=>{
     const id = req.params.id

     try {
          const user = await User.findById(id).select('-password')
          res.status(200). json({success: true, message: 'User found', data:user})
     } catch (error) {
          res.status(404). json({success: false, message: 'User not found'} )
     }

}
export const getAllUser = async (req,res)=>{

     try {
          const users = await User.find({}).select('-password')
          res.status(200). json({success: true, message: 'Users found', data:users})
     } catch (error) {
          res.status(404). json({success: false, message: 'Users not found'} )
     }

}