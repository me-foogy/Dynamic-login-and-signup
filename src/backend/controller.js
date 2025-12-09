import User from './schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const addUser = async (req, res) =>{

    const saltRounds = 10;
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const userData = {
            ...req.body,
            password: hashedPassword
        }
        const user = await User.create(userData);
        res.status(200).json(user);
    }
    catch(e){
        res.status(500).json({error: e});
        console.log('error addingg user', e);
    }
}

export const checkUser = async (req, res)=>{
    try{
        const  {userName, password} = req.body;
        if(!userName || !password){
            return res.status(400).json({message: " username and password required"});
        }

        const responseUser = await User.findOne({userName: userName});
        if(!responseUser) return res.status(400).json({message: "invalid username"});

        const isUser= bcrypt.compare(password, responseUser.password);
        if(!isUser) return res.status(400).json({message: "Login Credentials Wrong"});

        return res.status(200).json({message: "Login Successful",
                user: {
                    id: responseUser._id,
                    userName: responseUser.userName
                }

        });
    }
    catch(e){
        console.log("ERROR",e);
        res.status(400).json({message: "Unknown error occured"});
    }

}

export const checkUserName = async(req, res)=>{
    try{
        const {userName} = req.body;
        const user = await User.findOne({userName: userName});
        const availability = (user)?false:true;
        res.status(200).json({message: "check successful", availability: availability});
    }catch(e){
        console.log('an error occured when checking username',e)
        res.status(500).json({message: "an error occured", error:e});
    }
}
