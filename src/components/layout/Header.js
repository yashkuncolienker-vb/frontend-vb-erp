import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>CMS</div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.active}>CMS Page 1</li>
          <li className={classes.active}>CMS Page 2</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;