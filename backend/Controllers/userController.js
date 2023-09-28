import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { genToken } from "../utils/generateToken.js";

// To Login user: GET REQUEST
const loginUser = asyncHandler(async (req, res) => {
  // get user email and password
  const { email, password } = req.body;
  // check for the existence of the user in tha e database
  const user = await User.findOne({ email });
  
  // If user is in the database
  if (user && (await user.checkPasswordMatch(password))) {
    genToken(res, user._id);
    // send details back to the browser
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      facebook: user.facebook,
      department: user.department,
      level: user.level,
      isAdmin: user.isAdmin,
      friends: user.friends,
    });
  }  if (!user) {
    res.status(401);
    throw new Error("Invalid Email address");
  } if ((await user.checkPasswordMatch(password)) == false) {
    res.status(401);
    throw new Error("Invalid Password");
  }
});


// logout user
const logUserOut = asyncHandler(async (req, res) => {
  // clear the cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logout successfully",
  });
});


// Register user: POST REQUEST
const registerUser = asyncHandler(async (req, res) => {
  // get user details
  const { name, email, department, level, facebook, password } = req.body;

  // little validation: check if user already exits
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(404);
    throw new Error("User already exists");
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password,
    facebook,
    department,
    level,
    friends: [],
  });

  //generate token for the created user, if the user has been added to the database
  if (user) {
    genToken(res, user._id);

    // send details back to the browser
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      facebook: user.facebook,
      department: user.department,
      level: user.level,
      isAdmin: false,
      friends: user.friends,
    });
  }
  // If user was not created to the database
  else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});


// GET USER
const getUser = asyncHandler( async (req, res) => {
const userId = req.params.id;
console.log(1)
   const user = await User.findById(userId);
   if(user) {
      console.log(user);
   } else {
    res.status(404);
    throw new Error("User not found");
   }
})
// GET USERS
const getUsers = asyncHandler( async (req, res) => {
   const users = await User.find({});
   if(users) {
      console.log(users);
   } else {
    res.status(404);
    throw new Error("User not found");
   }
})


// AddRemoveFriend
const addRemoveFriend = asyncHandler(async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);


  if (friend && user) {
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
      console.log(111111111);

    } else {
      console.log(1234)
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await user.friends.map((id) => User.findById(id));
    const formattedFriends = friends.map(
      ({ _id, name, faculty, department, profile }) => {
        return { _id, name, faculty, department, profile };
      }
    );
    const userDetails = { _id: user._id, friends: user.friends, department: user.department, faculty:user.faculty, email: user.email, profile: user.profile, name: user.name, isAdmin: user.isAdmin};
    res.status(200).json(userDetails);
  } else {
    res.status(404);
    throw new Error("Invalid User");
  }
});


// Get User profile
const getUserProfile = asyncHandler( async (req, res) => {

})
// Get all User Friends
const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = await User.findById(id);
  console.log(user);
  const friends = await Promise.all(user.friends.map((id) => {
    return User.findById(id);
  }));
  console.log(friends);

  if (user && friends) {
    const formattedFriends = friends.map(
      (
        {
          _id, faculty, department, profile, friends
        }
      ) => {
        return {
          _id, faculty, department, profile, friends
        }
      }
    );
    res.status(200).json(formattedFriends);

  } else {
    res.status(404);
    throw new Error('Friends not found')
  }
});

export { registerUser, loginUser, addRemoveFriend, getUserFriends, logUserOut, getUsers,getUser, getUserProfile };
