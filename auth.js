
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./model/person.js')

passport.use(new LocalStrategy (async(USERNAME,password,done)=>{
    // authentication logic here
    try {
        console.log('Received credential:',USERNAME,password);
        const user=Person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:'incorrect Username:'})
        }
        const isPasswordMatch=user.password==password?true:false;
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'incorrect Password:'})
        }
        
    } catch (err) {
        return done(err);
    }
}))


module.exports=passport;