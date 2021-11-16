const customStyles = {
  backgroundColor: "cyan",
  height: "70px",
  position: "fixed",
  width: "100%",
};

const Header = () => {
  return (
    <header style={customStyles}>
      <div>CMS</div>
      <nav></nav>
    </header>
  );
};

export default Header;
