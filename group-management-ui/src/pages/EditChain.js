import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import chainService from "../services/chainService";
import groupService from "../services/groupService";

function EditChain() {
  const [chainName, setChainName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const loadGroups = useCallback(() => {
    groupService
      .getGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loadChain = useCallback(() => {
    chainService
      .getChains()
      .then((response) => {
        const chain = response.data.find(
          (c) => c.chainId === parseInt(id)
        );

        if (chain) {
          setChainName(chain.chainName);
          setSelectedGroup(chain.group.groupId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    loadGroups();
    loadChain();
  }, [loadGroups, loadChain]);

  const updateChain = () => {
    const chain = {
      chainName: chainName,
      group: {
        groupId: selectedGroup,
      },
    };

    chainService
      .updateChain(id, chain)
      .then(() => {
        alert("Chain Updated Successfully");
        navigate("/manage-chain");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-warning">
          <h3>Edit Chain</h3>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Chain Name</label>

            <input
              type="text"
              className="form-control"
              value={chainName}
              onChange={(e) => setChainName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Group</label>

            <select
              className="form-select"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groups.map((group) => (
                <option
                  key={group.groupId}
                  value={group.groupId}
                >
                  {group.groupName}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={updateChain}
          >
            Update Chain
          </button>

          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/manage-chain")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditChain;