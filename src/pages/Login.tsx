import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 48rem;
  gap: 3.2rem;
  place-content: center center;

  min-height: 100vh;

  background-color: var(--color-grey-50);
`;

function Login() {
  return <LoginLayout>
    <Logo />
    <Heading as="h4">Log in</Heading>
    <LoginForm />
  </LoginLayout>;
}

export default Login;
