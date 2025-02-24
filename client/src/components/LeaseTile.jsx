import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Row, Col, Divider } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import PostHeader from "./PostHeader";
import "./Component.css";

const LeaseTile = ({
    api_url,
    listing,
    lease,
    user,
    favorited,
    favorite,
    unFavorite,
}) => {
    const navigate = useNavigate();
    const [leaseListing, setLeaseListing] = useState(listing);
    const [userListing, setUserListing] = useState({});

    useEffect(() => {
        const getListing = async (id) => {
            try {
                const response = await fetch(`${api_url}/api/leases/${id}`);
                const data = await response.json();
                setLeaseListing(data);
            } catch (error) {
                console.error("Error fetching listing: ", error);
            }
        };

        if (!leaseListing.rent) {
            getListing(lease.listing_id);
        } else {
            return;
        }
    }, []);

    const {
        id,
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
    } = leaseListing;

    const goToListing = (id) => () => {
        navigate(`/listing/${id}`);
    };

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const response = await fetch(`${api_url}/api/users/${id}`);
                const data = await response.json();
                setUserListing(data);
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        if (user_id !== user.id) {
            getUser(user_id);
        } else {
            setUserListing(user);
        }
    }, [leaseListing]);

    return (
        <div className="lease-tile">
            <Card
                title={<PostHeader user={userListing} />}
                extra={
                    <>
                        <Button onClick={goToListing(id)}>View Details</Button>
                        {user_id !== user.id &&
                            (favorited ? (
                                <Button onClick={() => unFavorite(id)}>
                                    <HeartFilled style={{ color: "red" }} />
                                </Button>
                            ) : (
                                <Button onClick={() => favorite(id)}>
                                    <HeartOutlined style={{ color: "red" }} />
                                </Button>
                            ))}
                    </>
                }
                style={{
                    width: 600,
                    padding: "10px",
                    backgroundColor: "#f0f2f5",
                }}
            >
                <Col>
                    <Row>
                        <h2>Personal Info:</h2>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Contact Info:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{contact_info}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>University:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{university}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Tenant Names:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{tenant_names}</h3>
                        </Col>
                    </Row>

                    <Divider style={{ margin: "10px 0px" }} />

                    <Row>
                        <h2>Lease Info:</h2>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Lease Type:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{listing_type}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Room Type:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{room_setup}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>
                                Gender Preference:
                            </h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{preference_gender}</h3>
                        </Col>
                    </Row>

                    <Divider style={{ margin: "10px 0px" }} />

                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>
                                Rent (monthly):
                            </h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">${rent}/month</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>
                                Utilities (monthly):
                            </h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">${utilities}/month</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>
                                Lease Length (months):
                            </h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">
                                {lease_length} months
                            </h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>
                                Desired Start Date:
                            </h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{start_date}</h3>
                        </Col>
                    </Row>
                </Col>
            </Card>
        </div>
    );
};

export default LeaseTile;
