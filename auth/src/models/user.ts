import mongoose from "mongoose";

// An interface that describe the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describe the properties that a user model has 
interface UserModel extends mongoose.Model<UserDoc> { // this interface used for using User.build({});
  build(attrs: UserAttrs):UserDoc;
}

// An interface that describe the properties that a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true
  }
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}
// const User = mongoose.model('User', userSchema);    
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);// this is for when we used User.build({});

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// }

// buildUser({    // this is for testing purpose how our model is 
//   email: "test@test.com",
//   password: "password",
// })

// User.build({   // this is for the interface UserModel extends mongoose.Model<any> {build(attrs: UserAttrs)}
//   email: "test@test.com",
//   password: "password"
// })

// const user = User.build({    // this is when user an interface of userDocument
//   email: "test@test.com",
//   password: "password"
// })
// const email = user.email;
// const password = user.password;

export { User };