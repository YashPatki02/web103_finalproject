const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://housingpal-codepath-server.up.railway.app/api/leases"
        : "http://localhost:3001/api/leases";

const createLeaseListing = async (credentials) => {
    const {
        user_id,
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
    } = credentials;

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id,
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
        }),
    };

    try {
        const response = await fetch(`${API_URL}/`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const updateLeaseListing = async (credentials) => {
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
    } = credentials;

    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, options);
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};

const deleteLeaseListing = async (id) => {
    const options = {
        method: "DELETE",
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getLeaseListingById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getAllLeaseListings = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getLeaseListingsByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getLeaseListingsByLeaseType = async (leaseType) => {
    try {
        const response = await fetch(`${API_URL}/type/${leaseType}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default {
    createLeaseListing,
    updateLeaseListing,
    deleteLeaseListing,
    getLeaseListingById,
    getAllLeaseListings,
    getLeaseListingsByUserId,
    getLeaseListingsByLeaseType,
};
