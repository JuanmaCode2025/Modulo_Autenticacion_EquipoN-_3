// models/dashboard.js
import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo User
    required: true,
    unique: true
  },
  
  profile: {
    navigation: {
      type: [String],
      default: ["Dashboard", "Projects", "Invoices", "Reports"]
    }
  },  

  projects: [{
    title: String,
    deadline: String,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
  }],
  
  recommendedProjects: [{
    clientName: String,
    title: String,
    description: String,
    budget: Number,
    category: String
  }]
}, {
  timestamps: true
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
export default Dashboard;