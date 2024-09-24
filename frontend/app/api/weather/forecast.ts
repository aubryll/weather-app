//API to fetch the weather forecast for 16 days
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const {city, country} = body;
    try {
        const { data, status } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/forecast/${city}/${country}`,
            body
        );
        res.status(status).json(data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            res.status(status).json(data);
        } else {
            res.status(500).send({
                error_description: "Unknown error occurred, try again",
            });
        }
    }
};