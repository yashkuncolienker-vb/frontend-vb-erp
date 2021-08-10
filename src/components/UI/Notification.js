import classes from "./Notification.module.css";

const Notification = (props) => {
  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.show;
  }
  if (props.status === "success") {
    specialClasses = classes.show;
  }

  const cssClasses = `${classes.snackbar} ${specialClasses}`;

  return (
    <div id="snackbar" className={cssClasses}>
      {props.message}
    </div>
  );
};

export default Notification;
