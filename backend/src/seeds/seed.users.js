import {connectDB} from '../lib/db.js'
import User from '../models/user.model.js';
import dotenv from 'dotenv'

dotenv.config();


const moreSeedUsers = [
    {
      email: "harper.evans@example.com",
      fullName: "Harper Evans",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      email: "evelyn.turner@example.com",
      fullName: "Evelyn Turner",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      email: "ella.hall@example.com",
      fullName: "Ella Hall",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      email: "scarlett.allen@example.com",
      fullName: "Scarlett Allen",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      email: "grace.young@example.com",
      fullName: "Grace Young",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      email: "logan.king@example.com",
      fullName: "Logan King",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      email: "jack.wright@example.com",
      fullName: "Jack Wright",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      email: "sebastian.lopez@example.com",
      fullName: "Sebastian Lopez",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      email: "aiden.hill@example.com",
      fullName: "Aiden Hill",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      email: "matthew.scott@example.com",
      fullName: "Matthew Scott",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
    },
  ];




const seedUpload = async () =>{
    try {
        connectDB();
        await User.insertMany(moreSeedUsers);
        console.log("All the users are successfully added")
        
    } catch (error) {

        console.log(error)
        
    }
}
  


seedUpload()