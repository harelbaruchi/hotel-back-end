 const ExistingEmailQuery = "insert into user(name,contactNumber, email,password,status,role) values(?,?,?,?,'false','user')";

 const AddUserQuery = "select email, password, role, status from user where email=?";
 const AddNewProject = "insert into project(name,address,image,status,endDate) values(?,?,?,?,?)";
 const UpdateProject = "update project set name=?,address=?,image=?,status=?,endDate=? where id=?";
 const AddNewComment = "insert into comment (description,projectId,timeCreated) values(?,?,?)";

 module.exports={ExistingEmailQuery, AddUserQuery,AddNewProject, UpdateProject,AddNewComment};

