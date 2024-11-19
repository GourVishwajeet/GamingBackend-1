import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import WebSocket from 'ws';



const LiveEvents = asyncHandler(async (req, res) => {
  try {
    // Define the sports you want to get data for
    const sports = [
      "football", "tennis", "basketball", "american-football", "baseball", "cricket",
      "darts", "esports", "handball", "aussie-rules", "badminton", "bandy", 
      "beach-volleyball", "floorball", "futsal", "hockey", "rugby", "snooker", 
      "table-tennis", "volleyball", "waterpolo"
    ];

    // Prepare an array of axios requests for each sport
    const requests = sports.map((sport) => {
      return axios({
        method: 'get',
        url: `https://${sport}.sportdevs.com/matches-live`, // Fixed to use sport variable
        params:'',
        headers: {
          'Accept': 'application/json',
          "Authorization": "Bearer W0QOmHqqnk2GtoP0zI38Lw"
        }
      })
      .then(response => ({
        sport,
        data: response.data
      }))
      .catch(error => ({
        sport,
        error: error.response ? error.response.data : error.message
      }));
    });

    // Use Promise.allSettled to fetch data from all sports APIs concurrently
    const results = await Promise.allSettled(requests);

    // Combine the data from all responses
    const combinedData = results.map((result) => {
      if (result.status === 'fulfilled') {
        return {
          sport: result.value.sport,
          data: result.value.data // Successful response
        };
      } else {
        return {
          sport: result.reason.sport,
          error: result.reason.error // Include error information
        };
      }
    });

    // Send the combined data to the frontend
    res.status(200).json({
      message: "Data fetched successfully",
      combinedData, // This sends the combined data for all sports
    });
  } catch (error) {
    // Handle any unexpected errors
   
  }
})

const UpcomingAll = asyncHandler(async (req, res) => {
  try {
    // Define the sports you want to get data for
    const sports = [
      "football", "tennis", "basketball", "american-football", "baseball", "cricket",
      "darts", "esports", "handball", "aussie-rules", "badminton", "bandy", 
      "beach-volleyball", "floorball", "futsal", "hockey", "rugby", "snooker", 
      "table-tennis", "volleyball", "waterpolo"
    ];

    // Prepare an array of axios requests for each sport
    const requests = sports.map((sport) => {
     
      const today = new Date().toISOString().split('T')[0];
      return axios({
        method: 'get',
        url: `https://${sport}.sportdevs.com/matches?status_type=eq.upcoming`, // Fixed to use sport variable
        
        params:'',
        headers: {
          'Accept': 'application/json',
          "Authorization": "Bearer W0QOmHqqnk2GtoP0zI38Lw"
        }
      })
      .then(response => ({
        sport,
        data: response.data,
      }))
      .catch(error => ({
        sport,
        error: error.response ? error.response.data : error.message
      }));
    });

    // Use Promise.allSettled to fetch data from all sports APIs concurrently
    const results = await Promise.allSettled(requests);

    // Combine the data from all responses
    const combinedData = results.map((result) => {
      if (result.status === 'fulfilled') {
        return {
          sport: result.value.sport,
          data: result.value.data // Successful response
        };
      } else {
        return {
          sport: result.reason.sport,
          error: result.reason.error // Include error information
        };
      }
    });

    // Send the combined data to the frontend
    res.status(200).json({
      message: "All Upcoming events data fetched successfully",
      combinedData, // This sends the combined data for all sports
    });
  } catch (error) {
    // Handle any unexpected errors
   
  }
});


//  for cricket match innings by match id

const id = 24359
const LiveMatchInnings = asyncHandler(async (req, res) => {
  try {
    let config = {
      method: 'get',
      url: `https://cricket.sportdevs.com/matches-innings?match_id=eq.${id}`,
      headers: { 
        'Accept': 'application/json',
        "Authorization": "Bearer W0QOmHqqnk2GtoP0zI38Lw"
      }
    };

    const response = await axios(config);
    res.status(200).json({
      message: "Innings data fetched successfully",
      data: response.data, // Ensure you return `response.data`
            
    }  );

  } catch (error) {
    res.status(500).json({
      message: "Error fetching innings data",
      error: error.message
    });
  }
});

const LiveEventsBySportName = asyncHandler(async (req, res) => {
  try {

    const {sportName} = req.params;
    console.log('req.params:',sportName); 
    // console.log('req.params:', JSON.stringify(req.params));
    
    let config = {
      method: 'get',
      url: `https://${sportName}.sportdevs.com/matches-live`,
      headers: { 
        'Accept': 'application/json',
        "Authorization": "Bearer W0QOmHqqnk2GtoP0zI38Lw"
      }
    };

    const response = await axios(config);
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data, // Ensure you return `response.data`
            
    }  );

  } catch (error) {
    res.status(500).json({
      message: "Error fetching innings data",
      error: error.message
    });
  }
});

// // Replace with the appropriate sport, type, and add your API key
// const API_KEY = 'W0QOmHqqnk2GtoP0zI38Lw'; // Add your API key
// const sport = 'football'; // example sport
// const type = 'score'; // example type ('score', 'time', 'graph', or 'incident')

// // Create a WebSocket connection
// const ws = new WebSocket(`ws://webhook.entitysport.com:8087/connect?token=ec471071441bb2ac538a0ff901abd249`)

// ws.addEventListener('message', ev => console.log(ev.data))

// // When the connection is open
// ws.on('open', () => {
//   console.log('Connected to WebSocket server');
// });

// // Event listener for incoming messages
// ws.on('message', (data) => {
//   console.log('Message from server:', data);
// });

// // Handle WebSocket errors
// ws.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });

// // When the connection is closed
// ws.on('close', () => {
//   console.log('WebSocket connection closed');
// });

export { LiveEvents,LiveMatchInnings,LiveEventsBySportName ,UpcomingAll};


