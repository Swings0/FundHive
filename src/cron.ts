// src/cron.ts
import cron from 'node-cron';
import axios from 'axios';

// This cron job runs every 15 seconds
cron.schedule('*/15 * * * * *', async () => {
  try {
    console.log('Cron job triggered: Updating investments...');
   const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
   const url = `${baseUrl}/api/cron/update-investments`;

   const cronSecret = process.env.CRON_SECRET || 'fghfvhdsskdkfjhbnivknnbxuf'

   const response = await axios.get(url,{

   headers:{
     'Authorization': `Bearer ${cronSecret}`,
   },
  });

    console.log('Cron job response:', response.data);
  } catch (error) {
    console.error('Error triggering cron job:', error);
  }
});
