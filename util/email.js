import { Html, Button } from "@react-email/components";
import { Resend } from "resend";

function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click Me</Button>
    </Html>
  );
}

export default Email;

export function sendEmail() {
  const resend = new Resend("re_CCmZQdGU_5QfBZCWhxcX9FwVvxoKqhyZS");

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lukacho7@gmail.com",
    subject: "Hello from the other side",
    react: <Email url="https://example.com" />,
  });
}
