import { pool } from "../config/database.js";

const createLeaseListing = async (req, res) => {
    try {
        const {
            listing_type,
            tenant_names,
            room_setup,
            appliances,
            amenities,
            preference_gender,
            other_preferences,
            deal_breakers,
            location,
            rent,
            utilities,
            lease_length,
            start_date,
            contact_info,
            university,
            user_id,
        } = req.body;

        const results = await pool.query(
            `INSERT INTO listings 
            (listing_type, tenant_names, room_setup, appliances, amenities, 
                preference_gender, other_preferences, deal_breakers, location, 
                rent, utilities, lease_length, start_date, contact_info, 
                university, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                $11, $12, $13, $14, $15, $16)
            RETURNING *`,
            [
                listing_type,
                tenant_names,
                room_setup,
                appliances,
                amenities,
                preference_gender,
                other_preferences,
                deal_breakers,
                location,
                rent,
                utilities,
                lease_length,
                start_date,
                contact_info,
                university,
                user_id,
            ]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(409).json({ error: error.message });
    }
};

const updateLeaseListing = async (req, res) => {
    const {
        id,
        room_setup,
        appliances,
        amenities,
        preference_gender,
        other_preferences,
        deal_breakers,
        location,
        rent,
        utilities,
        lease_length,
        start_date,
        contact_info,
        university,
    } = req.body;

    try {
        const results = await pool.query(
            `UPDATE listings SET room_setup = $1, appliances = $2, amenities = $3,
            preference_gender = $4, other_preferences = $5, deal_breakers = $6,
            location = $7, rent = $8, utilities = $9, lease_length = $10,
            start_date = $11, contact_info = $12, university = $13
            WHERE id = $14
            RETURNING *`,
            [
                room_setup,
                appliances,
                amenities,
                preference_gender,
                other_preferences,
                deal_breakers,
                location,
                rent,
                utilities,
                lease_length,
                start_date,
                contact_info,
                university,
                id,
            ]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteLeaseListing = async (req, res) => {
    const listingId = req.params.id;

    try {
        const results = await pool.query(`DELETE FROM listings WHERE id = $1`, [
            listingId,
        ]);

        res.status(201).json(results.rowCount);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getLeaseListingById = async (req, res) => {
    const listingId = parseInt(req.params.id);

    try {
        const results = await pool.query(
            `SELECT * FROM listings WHERE id = $1`,
            [listingId]
        );

        if (results.rows.length === 0) {
            res.status(404).json({ error: "Listing not found" });
        } else {
            res.status(201).json(results.rows[0]);
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getAllLeaseListings = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM listings`);
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getLeaseListingsByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const results = await pool.query(
            `SELECT * FROM listings WHERE user_id = $1`,
            [userId]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    createLeaseListing,
    updateLeaseListing,
    deleteLeaseListing,
    getLeaseListingById,
    getAllLeaseListings,
    getLeaseListingsByUserId,
};
