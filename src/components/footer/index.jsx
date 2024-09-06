import PropTypes from "prop-types";

Footer.propTypes = {
  year: PropTypes.string,
};

export default function Footer(props) {
  return (
    <footer
      className="d-flex align-items-end justify-content-center w-100 text-bg-info"
      style={{ height: "60px" }}
    >
      <p>Copyright © {props.year}. All rights reserved.</p>
    </footer>
  );
}
