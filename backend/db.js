import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Use your MongoDB Atlas connection string
    await mongoose.connect('mongodb+srv://mehtadarpans2004:bV6WnHJncEwU9c2d@cluster0.lq3ft.mongodb.net/bee-quick', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure if there's an error
  }
};
