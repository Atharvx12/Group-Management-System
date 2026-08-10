function Header({ title }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">

      <h2>{title}</h2>

      <button className="btn btn-outline-danger">
        Logout
      </button>

    </div>
  );
}

export default Header;