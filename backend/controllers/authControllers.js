import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup=async (req,res)=>{
    try {
        const { fullName, username, password, gender } = req.body;

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;
        const girlProfilePic = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${username}`;

    const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

    const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic
    });
    if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
    }

    await newUser.save();

    res.status(201).json({
       fullName: newUser.fullName,
  username: newUser.username,
  profilePic: newUser.profilePic
     });

    } catch (error) {
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}
export const login=async (req,res)=>{
   	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const logout=(req,res)=>{
  	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

