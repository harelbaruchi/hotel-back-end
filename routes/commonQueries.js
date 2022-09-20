const ExistingEmailQuery =
  "insert into user(name,contactNumber, email,password,status,role) values(?,?,?,?,'false','user')";

const AddUserQuery =
  "select email, password, role, status from user where email=?";

  

  //hotel API 

  const UpdateHotel='update hotel set name=?, address=?, image=? where id=?';
const AddNewHotel = "insert into hotel(name,address,image) values(?,?,?)";
const GetHotel = "select *from hotel order by name";

//room API 
const AddNewRoom = "insert into room(type,hotelId,availableCount) values(?,?,?)";
const GetRoom= "select r.id,r.type,r.availableCount,h.id as hotelId,h.name as hotelName from room as r INNER JOIN hotel as h where r.hotelId= h.id";

//reservation API 


 const GetReservation= 
 "select b.id,b.inbound, b.outbound, b.personFName, r.id as roomId, r.type as roomType, h.id as hotelId, h.name as hotelName from reservation as b INNER JOIN room as r ON b.roomId=r.id INNER JOIN hotel as h ON r.hotelId=h.id ORDER BY h.name";
const AddNewReservation =
  "insert into reservation(roomId,inbound,outbound,personFName) values(?,?,?,?)";   

module.exports = {
  ExistingEmailQuery,
  AddUserQuery,
  AddNewHotel,
  GetHotel,
  UpdateHotel,
  AddNewRoom,
  GetRoom,
  AddNewReservation,
  GetReservation
};
