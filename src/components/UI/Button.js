const Button = ({ type, ...props }) => (
  <button type={type || 'button'} {...props}></button>
)