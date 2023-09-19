 const { append } = require("express/lib/response");
 const prisma = require("../db");
 const {generateJwtAuthToken} = require("../utility/jwt.helper");
 const bcrypt = require('bcryptjs');


 // register a User
exports.register = async (req, res) => {
    try{
    // Create 
    const salt = await bcrypt.genSalt(10)
    const hash_password= await bcrypt.hash(req.body.password, salt)
    const user= {
      fullName: req.body.fullName,
      email: req.body.email,
      password:  hash_password
    };
  
    // Save user in the database

    const users = await prisma.user.create({data:user});
    res.status(200).send({
      data: users, 
      response: {
        status: 200, 
        message: 'Success'
      }
    });
  }catch(err) {
    res.status(500).send({
      data: err.message, 
      response: {
        status: 500, 
        message: 'Internal Server Error'
      }
    });
  }
  
  };
//login user
  exports.login = async (req, res) => {
    try{
    // Create 
    const user= {
      email: req.body.email,
      password: req.body.password, 
    };
    const users = await prisma.user.findFirst({where:{email:req.body.email}});
    console.log({ users })
      if(!users) {
        return res.status(400).send({
          data: null, 
          response: {
            status: 400, 
            message: 'Invalid username or password'
          }
        });
      }
       const isvalid= await bcrypt.compare(req.body.password,users.password)
      console.log(users.password,isvalid)
       if(isvalid) {
        const tokenObj = generateJwtAuthToken({userid:users.userId});
        if(!tokenObj.success) {
          return res.status(500).send({
            data: null, 
            response: {
              status: 500, 
              message: 'Internal Server Error'
            }
          });
        }
        return res.status(200).send({
          data: {token: tokenObj.token}, 
          response: {
            status: 200, 
            message: 'Success'
          }
        });
       }

       return res.status(401).json({
         message: 'invalid username or password'
       })
      

  }catch(err) {
    return res.status(500).send({
      data: err.message, 
      response: {
        status: 500, 
        message: 'Internal Server Error'
      }
    });
  }
  
  };

//dashboard
exports.dashboard = async (req, res) => {
  try{
    const {id} = req.params;
  
  const user = await prisma.user.findUnique({where:{userId:Number(id)}});
  if(!user) {
    return res.status(404).send({       
      response: {
        status: 404, 
        message: 'error..! no such record'
      }
    }); 
  }

  return res.status(200).send({
    data:user, 
    response: {
      status: 200, 
      message: 'Success'
    }
  });     
    }catch(err) {
      return res.status(500).send({
        data: null, 
        response: {
          status: 500, 
          message: 'Internal Server Error'
        }
      });
    }
    
  };

  
  

//get by id
// exports.findOne = async (req, res) => {
//   try{
//     const {id} =req.params
  
//   const jobs = await prisma.job_department.findUnique({
//     where:{
//       job_id:Number(id)
//     },
//   })

//   res.send(jobs);
// }catch(err) {
//   res.send(err);
// }

// };

// // Update a job department with id
// exports.update = async (req, res) => {
//   try{
//     const {id} =req.params

  
//   const jobs = await prisma.job_department.update({
//     where:{
//       job_id:Number(id)
//     },
//     data:{
//       job_dept:req.body.job_dept,
//     }
    
//   })

//   res.send(jobs);
// }catch(err) {
//   res.send(err);
// }

// }

// //delete a user with the specified id in the request
// exports.delete = async (req, res) => {
//   try{
//     const {id} =req.params

  
//   const jobs = await prisma.job_department.delete({
//     where:{
//       job_id:Number(id)
//     },
   
    
//   })

//   res.send(jobs);
// }catch(err) {
//   res.send(err);
// }

// }




