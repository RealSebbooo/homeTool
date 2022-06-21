const React = require("react");
const { isLoggedIn } = require("./src/services/auth");
const Container = require("./src/components/container");
const FooterNav = require("./src/components/footer");

exports.onRouteUpdate = () => {
  isLoggedIn();
};

exports.wrapPageElement = ({ element, props }) => {
  return (
    <Container {...props}>
      <div>{element}</div>

      <FooterNav></FooterNav>
    </Container>
  );
};
