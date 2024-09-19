import jwt from 'jsonwebtoken'
import User from '../models/user'
import { Username } from '../types/controllerTypes'
import { Request, Response } from 'express'
import 'dotenv/config.js'

const SECRET = process.env.SECRET

const createJwt = (user: Username)=>{
    return jwt.sign(
        {user},
        SECRET as string,
        {expiresIn: '24h'}
    )
}

const signUp = async(req:Request, res:Response):Promise<Response>=>{
    try{
        const existingUser = await User.findOne({username: req.body.username})
        const newUser = await User.create(req.body)

        if(existingUser){
            throw new Error('Username already in use')
        }

        if(!SECRET){
            throw new Error('SECRET is not defined in env')
        }

        return res.status(200).json({
            newUser
        })
    } catch (error){
        if(error instanceof Error && error.message !== 'Username already in use' && req.body.username){
            await User.findOneAndDelete({username: req.body.username})
            return res.status(500).json({
                message: 'username deleted on failed user creation',
                error: error.message
            })
        }else if(error instanceof Error){
            return res.status(500).json({
                message: 'Error creating user',
                error: error.message
            })
        } else{ 
            return res.status(500).json({message: 'Unknonw Error Occured'})
        }
    }
}

const signIn = async(req: Request, res: Response):Promise<Response> =>{
    try{
        const user = await User.findOne({username: req.body.username})

        if(!user){
            return res.status(400).json({error: 'User not found'})
        }

        const isMatch = await user.comparePassword(req.body.password)

        if(!isMatch){
            return res.status(400).json({error: 'Incorrect password'})
        }

        const token = createJwt(user.username)
        return res.status(200).json({token, user})
    } catch (error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        } else{
            return res.status(400).json({ error: 'An unknown error occurred'})
        }
    }
}

export {
    signIn,
    signUp
}