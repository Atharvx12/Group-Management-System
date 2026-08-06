import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChainTable from "../components/ChainTable";
import chainService from "../services/chainService";

function ManageChain() {

  const [chains, setChains] = useState([]);

  useEffect(() => {
    loadChains();
  }, []);

  const loadChains = () => {
    chainService
      .getChains()
      .then((response) => {
        setChains(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">

          <Header />

          <div className="card mt-4">

            <div className="card-body">

              <h3>Total Chains : {chains.length}</h3>

              <Link
                to="/add-chain"
                className="btn btn-success mt-3"
              >
                Add Chain
              </Link>

              <ChainTable chains={chains} />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ManageChain;