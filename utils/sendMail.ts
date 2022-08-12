interface sendMailProps {
  contact: string;
  message: string;
}

const sendMail = async (payload: sendMailProps) =>
  await fetch(process.env.LAMBDA_API_URL as string, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .catch(console.log);

export default sendMail;
