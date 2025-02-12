// src/cron.ts
import cron from 'node-cron';
import axios from 'axios';

// This cron job runs every 15 seconds
cron.schedule('*/15 * * * * *', async () => {
  try {
    console.log('Cron job triggered: Updating investments...');
    const response = await axios.get('http://localhost:3000/api/cron/update-investments');
    console.log('Cron job response:', response.data);
  } catch (error) {
    console.error('Error triggering cron job:', error);
  }
});
