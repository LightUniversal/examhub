import bcrypt from "bcryptjs";
const users = [
    {
        name : "Admin User",
        email : "admin@gmail.com",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : true,
        facebook : "Engineering",
        twitter: "Electronics Engineering",
        friends: [],
        likes: [],

    },
    {
        name : "Admin User",
        email : "admin1@gmail.com",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : true,
        facebook : "Engineering",
        twitter: "Electronics Engineering",
        friends: [],
        likes: [],

    },
]
export default users;