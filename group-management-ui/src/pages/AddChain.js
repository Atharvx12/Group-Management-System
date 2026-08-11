import React, { useEffect, useState } from "react";
import axios from "axios";

function AddChain() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://group-management-system-production.up.railway.app/groups")
            .then((response) => {
                console.log("GROUPS RECEIVED:", response.data);

                setGroups(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("ERROR LOADING GROUPS:", error);
                setLoading(false);
                alert("Unable to load groups");
            });
    }, []);

    return (
        <div>
            <h2>Add Chain</h2>

            {loading ? (
                <p>Loading groups...</p>
            ) : (
                <div>
                    <h3>Available Groups</h3>

                    {groups.length === 0 ? (
                        <p>No groups found.</p>
                    ) : (
                        <ul>
                            {groups.map((group) => (
                                <li key={group.id}>
                                    {group.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default AddChain;