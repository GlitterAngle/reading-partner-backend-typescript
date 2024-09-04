import User from "../models/user"
import Recording from "../models/recording"
import { Request, Response } from "express";
import mongoose from "mongoose";

//this is just for testing
const getAllUsers = async(req: Request,res: Response): Promise<Response> =>{
    try {
        const allUsers = await User.find({})
        return res.status(200).json({
            allUsers
        })
    } catch (error) {
        console.error('Error in retreiving all users: this error comes from your userController')
        if(error instanceof Error){
            return res.status(500).json({
                message: 'Error retriving all user information',
                error: error.message
            })
        } else{
            return res.status(500).json({message: "Unknown Error Occured"})
        }
    }
}

//these are for production use
const getUserByUsername = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const username = req.params.username
        const userProfile = await User.findOne({username: username})
        return res.status(200).json({
            userProfile
        })
    } catch (error) {
        console.error('Error retreiving user: this error coms from your userController in the getUserByUsername')
        if(error instanceof Error){
            return res.status(500).json({
                message: 'Error retriving user information',
                error: error.message
            })
        }else{
           return res.status(500).json({message: "Unknown Error Occured"})
        }
        
    }
}

const createUser = async(req:Request, res:Response): Promise<Response>=>{
    try {
        const userPayload = req.body
        const newUser = await User.create(userPayload)
        return res.status(200).json({
            newUser
        })
    } catch (error) {
        console.error('Error creating user: this error comes from your userController file from the createUser function')
        if(error instanceof Error){
            return res.status(500).json({
                message: 'Error creating user',
                error: error.message
            })
        }else{
            return res.status(500).json({message: "Unknown Error Occured"})
        }
    }
}

const editUser = async(req: Request<{id: string}>, res:Response): Promise<Response>=>{
    try {
        const userToEdit = req.params.id
        const userPayload = req.body
        const editUser = await User.findOneAndUpdate({_id: userToEdit},userPayload, {new: true})
        return res.status(200).json({
            editUser
        })
    } catch (error) {
        console.error('Error editing user: this error comes from your userController file from the editUser function')
        if(error instanceof Error){
           return res.status(500).json({
                message: 'Error editing user',
                error: error.message
            })
        } else { 
            return res.status(500).json({message: "Unknown Error Occured"})
        }
    }
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userID = req.params.id;  // Get the ID from the URL parameters

        // Attempt to find and delete the user by ID
        const deleteUser = await User.findByIdAndDelete(userID);

        if (deleteUser) {
            // If user is found and deleted, attempt to delete associated recordings
            const deleteUserData = await Recording.deleteMany({ user: deleteUser._id });
            return res.status(200).json({
                message: 'User and related data deleted successfully',
                deleteUser,
                deletedRecordings: deleteUserData
            });
        } else {
            // If no user is found, return a 404 response
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                message: 'Error deleting user',
                error: error.message
            })
        }else{
            return res.status(500).json({message: "Unknown Error Occured"})
        }
    }
}


export {
    getAllUsers,
    getUserByUsername,
    createUser,
    editUser,
    deleteUser
}