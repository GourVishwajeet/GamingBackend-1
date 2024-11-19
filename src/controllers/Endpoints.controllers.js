import { asyncHandler } from '../utils/asyncHandler.js';
import axios from 'axios';

const SportsByName = asyncHandler(async (req, res) => {
    const  startDate = 2024-10-4
    const endDate = 2024-10-7   // Fetch start and end date from query params
    
    try {
        // Validate if startDate and endDate are provided
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "Please provide both startDate and endDate in the query parameters."
            });
        }

        let config = {
            method: 'get',
            url: `https://football.sportdevs.com/matches?`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer W0QOmHqqnk2GtoP0zI38Lw',
            },
        };

        const response = await axios(config);

        // Send the fetched data in the response
        res.status(200).json({
            data: response.data,
            message: 'Data fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching the data',
            error: error.message,
        });
    }
});


const TournamentsBySports = asyncHandler(async (req, res) => {
    const  startDate = 2024-10-4
    const endDate = 2024-10-7   // Fetch start and end date from query params
    
    try {
        const {classId} = req.body
        console.log("classIDddddd",classId);
        // Validate if startDate and endDate are provided
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "Please provide both startDate and endDate in the query parameters."
            });
        }

        let config = {
            method: 'get',
            url: `https://football.sportdevs.com/tournaments-by-class?class_id=eq.${classId}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer W0QOmHqqnk2GtoP0zI38Lw',
            },
        };

        const response = await axios(config);

        // Send the fetched data in the response
        res.status(200).json({
            data: response.data,
            message: 'Data fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching the data',
            error: error.message,
        });
    }
});


// to  fetch all classes(countries)
const FetchAllClasses = asyncHandler(async (req, res) => {
    const  startDate = 2024-10-4
    const endDate = 2024-10-7   // Fetch start and end date from query params
    
    try {
        const {classId} = req.body
        console.log("classIDddddd",classId);
        // Validate if startDate and endDate are provided
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "Please provide both startDate and endDate in the query parameters."
            });
        }

        let config = {
            method: 'get',
            url: `https://football.sportdevs.com/classes`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer W0QOmHqqnk2GtoP0zI38Lw',
            },
        };

        const response = await axios(config);

        // Send the fetched data in the response
        res.status(200).json({
            data: response.data,
            message: 'Data fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching the data',
            error: error.message,
        });
    }
});
export { SportsByName ,TournamentsBySports,FetchAllClasses};
