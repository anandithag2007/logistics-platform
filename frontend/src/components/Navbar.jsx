function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <h2>🚚 Logistics Platform</h2>

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;