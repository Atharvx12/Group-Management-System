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