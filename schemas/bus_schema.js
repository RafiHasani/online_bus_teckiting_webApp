const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jwt_key: { type: String, unique: true },
  // You can add more fields like name, contact number, etc. as needed
});

// Bus Schema
const busSchema = new Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  // You can add more details like bus model, operator, etc. as needed
});

// Route Schema
const routeSchema = new Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  // You can add more details like duration, fare, etc. as needed
});

// Booking Schema
const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bus: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
  route: { type: Schema.Types.ObjectId, ref: "Route", required: true },
  seatNumber: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  // You can add more details like fare, status, etc. as needed
});

const User = mongoose.model("User", userSchema);
const Bus = mongoose.model("Bus", busSchema);
const Route = mongoose.model("Route", routeSchema);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {
  User,
  Bus,
  Route,
  Booking,
};
